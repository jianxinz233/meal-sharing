import express from 'express'
import knex from "../database_client.js";

const mealsRouter = express.Router();

const getAllMeals = async() => {
    try{
        const allMeals = await knex("meal").select("*").orderBy("id")
        return allMeals;
      } catch (error) {
        console.error("Fetching All Meals Error:", error);
        return [];
      }
};

// GET /api/meals
mealsRouter.get("/", async (req, res) => {
    const allMeals = await getAllMeals();
    if (allMeals.length === 0) {
        return res.status(404).json({ message: "No matching meals" })
    }
    res.status(200).json(allMeals);
});

// POST /api/meals
mealsRouter.post("/", async (req, res) => {
    try{
        const reqBody = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            when: req.body.when,
            max_reservations: req.body.max_reservations,
            price: req.body.price
        };

        const [insertedMealId] = await knex("meal").insert(reqBody);
        res.status(201).json({
            message: "Meal successfull added",
            mealId: insertedMealId
        });
    } catch (error) {
        console.error("Error adding meal:", error );
        res.status(500).json({ error: "Failed to add meal" });
    }
});

// GET /api/meals/:id
mealsRouter.get("/:id", async (req, res) => {
   try{
        const allMeals = await getAllMeals();
        const mealId = +req.params.id;
        const matchMeal = allMeals.find((meal) => meal.id === mealId);
        if (!matchMeal) {
            return res.status(404).json({ message: "No matching meal"})
        }
        return res.status(200).json(matchMeal);
    } catch (error) {
        console.error("Error fetching meal:", error );
        res.status(500).json({ error: "Failed fetching meal" });
    }
});

// PUT /api/meals/:id
mealsRouter.put("/:id", async (req, res) => {
    try{
        const mealId = +req.params.id;
        const reqBody = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            when: req.body.when,
            max_reservations: req.body.max_reservations,
            price: req.body.price
        };

        const updateMealNum = await knex("meal")
            .where({ id: mealId })
            .update(reqBody);
        
        if (updateMealNum === 0) {
            return res.status(404).json({ message: "No matching update" })
        }
        
        return res.status(200).json({ message: "Meal updated successfull" });
    } catch (error) {
        console.error("Error updating meal:", error );
        res.status(500).json({ error: "Failed to update meal" });
    }
 });

 // DELETE /api/meals/:id
 mealsRouter.delete("/:id", async (req, res) => {
    try{
        const mealId = +req.params.id;
        
        const deleteMealNum = await knex("meal")
            .where({ id: mealId })
            .del();
        
        if (deleteMealNum === 0) {
            return res.status(404).json({ message: "Meal not found" })
        }
        
        return res.status(200).json({ message: "Meal deleted successfull" });
    } catch (error) {
        console.error("Error deleting meal:", error );
        res.status(500).json({ error: "Failed to delete meal" });
    }
 });

export default mealsRouter;