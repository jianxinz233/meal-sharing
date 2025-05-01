import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

// const getAllMeals = async () => {
//   try {
//     const allMeals = await knex("meal").select("*").orderBy("id");
//     return allMeals;
//   } catch (error) {
//     console.error("Fetching All Meals Error:", error);
//     return [];
//   }
// };

// GET /api/meals with query parameters
mealsRouter.get("/", async (req, res) => {
  try {
    let meals = knex("meal");

    // maxPrice
    if (req.query.maxPrice) {
      const maxPrice = +req.query.maxPrice;
      if (isNaN(maxPrice)) {
        return res
          .status(400)
          .json({ message: "Please insert a valid number" });
      }
      meals = meals.where("price", ">=", maxPrice);
    }

    if (req.query.availableReservations) {
    }

    // availableReservations
    if (req.query.availableReservations) {
      const isAvailable =
        req.query.availableReservations.toLowerCase() === "true";
      if (isAvailable) {
        meals = meals
          .leftJoin("reservation", "meal.id", "reservation.meal_id")
          .select(
            "meal.*",
            knex.raw(
              "meal.max_reservations - COALESCE(SUM(reservation.number_of_guests), 0) AS available_reservations"
            )
          )
          .groupBy("meal.id")
          .havingRaw("available_reservations > 0");
      } else {
        return res.status(404).json({ message: "No matching" });
      }
    }

    // title or description
    if (req.query.title) {
      const titleKeywords = req.query.title.toLowerCase().split(" ");

      meals = meals.where((keyword) => {
        titleKeywords.forEach((word) => {
          keyword.orWhereILike("title", `%${word}%`);
        });
      });
    }

    // dateAfter
    if (req.query.dateAfter) {
      const dateInput = new Date(req.query.dateAfter);
      const dateInputFormat = dateInput
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      meals = meals.where("when", ">=", dateInputFormat);
    }

    // dateBefore
    if (req.query.dateBefore) {
      const dateInput = new Date(req.query.dateBefore);
      const dateInputFormat = dateInput
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      meals = meals.where("when", "<=", dateInputFormat);
    }

    // limit
    if (req.query.limit) {
      const limitNum = parseInt(req.query.limit);
      if (isNaN(limitNum)) {
        return res
          .status(400)
          .json({ message: "Please insert a valid number" });
      }
      meals = meals.limit(limitNum);
    }

    // sortKey & sortDir
    let sortKey = "id";
    if (req.query.sortKey) {
      const validKeys = ["when", "max_reservations", "price"];
      sortKey = req.query.sortKey.toLowerCase();
      if (!validKeys.includes(sortKey)) {
        return res.status(400).json({ error: "Invalid sort key" });
      }
    }

    let sortDir = "asc";
    if (req.query.sortDir) {
      const validDir = ["asc", "desc"];
      sortDir = req.query.sortDir.toLowerCase();
      if (!validDir.includes(sortDir)) {
        return res.status(400).json({ error: "Invalid sort key" });
      }
    }

    meals = meals.orderBy(sortKey, sortDir);

    const mealsResult = await meals;
    if (mealsResult.length === 0) {
      return res.status(404).json({ message: "No matching meals" });
    }
    res.status(200).json(mealsResult);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meals" });
  }
});

// POST /api/meals
mealsRouter.post("/", async (req, res) => {
  try {
    const reqBody = {
      title: req.body.title,
      imgUrl: req.body.imgUrl,
      description: req.body.description,
      location: req.body.location,
      when: req.body.when,
      max_reservations: req.body.max_reservations,
      price: req.body.price,
    };

    const [insertedMealId] = await knex("meal").insert(reqBody);
    res.status(201).json({
      message: "Meal successfully added",
      mealId: insertedMealId,
    });
  } catch (error) {
    console.error("Error adding meal:", error);
    res.status(500).json({ error: "Failed to add meal" });
  }
});

// GET /api/meals/:id
mealsRouter.get("/:id", async (req, res) => {
  try {
    const mealId = +req.params.id;

    const matchMeal = await knex("meal").select("*").where({ id: mealId });

    if (!matchMeal) {
      return res.status(404).json({ message: "No matching meal" });
    }
    return res.status(200).json(matchMeal);
  } catch (error) {
    console.error("Error fetching meal:", error);
    res.status(500).json({ error: "Failed fetching meal" });
  }
});

// PUT /api/meals/:id
mealsRouter.put("/:id", async (req, res) => {
  try {
    const mealId = +req.params.id;
    const reqBody = {
      title: req.body.title,
      imgUrl: req.body.imgUrl,
      description: req.body.description,
      location: req.body.location,
      when: req.body.when,
      max_reservations: req.body.max_reservations,
      price: req.body.price,
    };

    const updateMealNum = await knex("meal")
      .where({ id: mealId })
      .update(reqBody);

    if (updateMealNum === 0) {
      return res.status(404).json({ message: "No matching update" });
    }

    return res.status(200).json({ message: "Meal updated successfully" });
  } catch (error) {
    console.error("Error updating meal:", error);
    res.status(500).json({ error: "Failed to update meal" });
  }
});

// DELETE /api/meals/:id
mealsRouter.delete("/:id", async (req, res) => {
  try {
    const mealId = +req.params.id;

    const deleteMealNum = await knex("meal").where({ id: mealId }).del();

    if (deleteMealNum === 0) {
      return res.status(404).json({ message: "Meal not found" });
    }

    return res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ error: "Failed to delete meal" });
  }
});

// GET /meals/:meal_id/reviews
mealsRouter.get("/:meal_id/reviews", async (req, res) => {
  try {
    const mealId = req.params.meal_id;
    const matchReview = await knex("meal")
      .join("review", "meal.id", "review.meal_id")
      .select(
        "meal.id AS meal_id",
        "meal.title AS meal_title",
        "review.title AS review_title",
        "review.description AS review_description",
        "review.stars",
        "review.created_date"
      )
      .where({ meal_id: mealId });

    if (matchReview.length === 0) {
      return res.status(404).json({ message: "No matching reviews" });
    }
    res.status(200).json(matchReview);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

export default mealsRouter;
