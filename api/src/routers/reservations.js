import express from "express";
import knex from "../database_client.js";

const reservationsRouter = express.Router();

// const getAllReservations = async () => {
//   try {
//     const allReservations = await knex("reservation").select("*").orderBy("id");
//     return allReservations;
//   } catch (error) {
//     console.error("Fetching All Reservations Error:", error);
//     return [];
//   }
// };

// GET /api/reservations
reservationsRouter.get("/", async (req, res) => {
  try {
    const allReservations = await knex("reservation").select("*").orderBy("id");
    if (allReservations.length === 0) {
      return res.status(404).json({ message: "No matching reservations" });
    }
    res.status(200).json(allReservations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

// POST /api/reservations
reservationsRouter.post("/", async (req, res) => {
  try {
    const {
      meal_id,
      number_of_guests,
      contact_phonenumber,
      contact_name,
      contact_email,
    } = req.body;

    const meal = await knex("meal").where({ id: meal_id }).first();
    if (!meal) return res.status(404).json({ error: "Meal not found" });

    const { total_reserved } = await knex("reservation")
      .where({ meal_id })
      .sum("number_of_guests as total_reserved")
      .first();

    const currentReserved = Number(total_reserved) || 0;
    const availableSpots = meal.max_reservations - currentReserved;

    if (number_of_guests > availableSpots) {
      return res.status(400).json({ error: "Not enough available spots" });
    }

    let user = await knex("user").where({ email: contact_email }).first();

    if (!user) {
      const [user_id] = await knex("user").insert(
        {
          name: contact_name,
          email: contact_email,
        },
        ["id"]
      );
      user = { id: user_id };
    }
    const [reservationId] = await knex("reservation").insert({
      meal_id,
      userId: user.id,
      number_of_guests,
      contact_phonenumber,
      contact_name,
      contact_email,
    });

    res.status(201).json({
      message: "Reservation successfully added",
      reservationId,
    });
  } catch (error) {
    console.error("Error adding reservation:", error);
    res.status(500).json({ error: "Failed to add reservation" });
  }
});

// GET /api/reservations
reservationsRouter.get("/:id", async (req, res) => {
  try {
    const reservationId = +req.params.id;
    const matchReservation = await knex("reservation")
      .select("*")
      .where({ id: reservationId });
    if (!matchReservation) {
      return res.status(404).json({ message: "No matching reservation" });
    }
    return res.status(200).json(matchReservation);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ error: "Failed fetching reservation" });
  }
});

// PUT /api/reservations
reservationsRouter.put("/:id", async (req, res) => {
  try {
    const reservationId = +req.params.id;
    const reqBody = {
      number_of_guests: req.body.number_of_guests,
      meal_id: req.body.meal_id,
      contact_phonenumber: req.body.contact_phonenumber,
      contact_name: req.body.contact_name,
      contact_email: req.body.contact_email,
    };

    const updateReservationNum = await knex("reservation")
      .where({ id: reservationId })
      .update(reqBody);

    if (updateReservationNum === 0) {
      return res.status(404).json({ message: "No matching update" });
    }

    return res
      .status(200)
      .json({ message: "Reservation updated successfully" });
  } catch (error) {
    console.error("Error updating reservation", error);
    res.status(500).json({ error: "Failed to update reservation" });
  }
});

// DELETE /api/reservations
reservationsRouter.delete("/:id", async (req, res) => {
  try {
    const reservationId = +req.params.id;

    const deleteReservationNum = await knex("reservation")
      .where({ id: reservationId })
      .del();

    if (deleteReservationNum === 0) {
      return res.status(404).json({ message: "No matching deleting" });
    }

    return res
      .status(200)
      .json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ error: "Failed to delete reservation" });
  }
});

export default reservationsRouter;
