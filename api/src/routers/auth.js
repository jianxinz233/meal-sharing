import express from "express";
import knex from "../database_client.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { full_name, email, phone, password, role } = req.body;

  if (!full_name || !email || !phone || !password || !role) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await knex("user").insert({ full_name, email, phone, password, role });
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Registration failed", details: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await knex("user").where({ email }).first();

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.status(200).json({
    user: { id: user.id, name: user.full_name, role: user.role },
  });
});

export default authRouter;
