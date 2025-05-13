import express from "express";
import knex from "../database_client.js";

const reviewsRouter = express.Router();

// const getAllReviews = async () => {
//     try {
//         const allReviews = await knex("review").select("*").orderBy("id");
//         return allReviews;
//     } catch (error) {
//         console.error("Fetching All Reviews Error:", error);
//         return [];
//     }
// };

// GET /reviews
reviewsRouter.get("/", async (req, res) => {
  const allReviews = await knex("review").select("*").orderBy("id");
  if (allReviews.length === 0) {
    return res.status(404).json({ message: "No matching reviews" });
  }
  res.status(200).json(allReviews);
});

// GET /meals/:meal_id/reviews

// POST /reviews
reviewsRouter.post("/", async (req, res) => {
  try {
    const reqBody = {
      title: req.body.title,
      description: req.body.description,
      meal_id: req.body.meal_id,
      stars: +req.body.stars,
    };
    const [addReviewId] = await knex("review").insert(reqBody);
    res.status(201).json({
      message: "Review successfully added",
      reviewId: addReviewId,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
});

// GET /reviews/:id
reviewsRouter.get("/:id", async (req, res) => {
  try {
    const allReviews = await getAllReviews();
    const reviewId = +req.params.id;
    const matchReview = await knex("review")
      .select("*")
      .where({ id: reviewId });
    if (!matchReview) {
      return res.status(404).json({ message: "No matching review" });
    }
    res.status(200).json(matchReview);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Failed to fetch review" });
  }
});

// PUT /reviews/:id
reviewsRouter.put("/:id", async (req, res) => {
  try {
    const reviewId = +req.params.id;
    const reqBody = {
      title: req.body.title,
      description: req.body.description,
      meal_id: req.body.meal_id,
      stars: +req.body.stars,
    };
    const updateReviewNum = await knex("review")
      .where({ id: reviewId })
      .update(reqBody);

    if (updateReviewNum === 0) {
      return res.status(404).json({ message: "No matching review" });
    }
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
});

// DELETE /reviews/:id
reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const reviewId = +req.params.id;
    const deleteReviewNum = await knex("review").where({ id: reviewId }).del();

    if (deleteReviewNum === 0) {
      return res.status(404).json({ message: "No matching review" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
});

export default reviewsRouter;
