import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});

app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});

apiRouter.get("/future-meals", async (req, res) => {
  try{
    const GET_FUTURE_MEALS_QUERY = "SELECT * FROM meal WHERE `when` > NOW();";
    const [futureMeals, schema] = await knex.raw(GET_FUTURE_MEALS_QUERY);
    res.json(futureMeals);
  } catch (error) {
    console.error("Fetching Future Meals Error:", error);
    res.status(500).json({ error: "Not successful" });
  }
});

apiRouter.get("/past-meals", async (req, res) => {
  try{
    const GET_PAST_MEALS_QUERY = "SELECT * FROM meal WHERE `when` < NOW();";
    const [pastMeals, schema] = await knex.raw(GET_PAST_MEALS_QUERY);
    res.json(pastMeals);
  } catch (error) {
    console.error("Fetching Past Meals Error:", error);
    res.status(500).json({ error: "Not successful" });
  }
});

apiRouter.get("/all-meals", async (req, res) => {
  try{
    const GET_ALL_MEALS_QUERY = "SELECT * FROM meal ORDER BY ID;";
    const [allMeals, schema] = await knex.raw(GET_ALL_MEALS_QUERY);
    res.json(allMeals);
  } catch (error) {
    console.error("Fetching All Meals Error:", error);
    res.status(500).json({ error: "Not successful" });
  }
});

apiRouter.get("/first-meal", async (req, res) => {
  try{
    const GET_FIRST_MEAL_QUERY = "SELECT * FROM meal ORDER BY ID LIMIT 1;";
    const [firstMeal, schema] = await knex.raw(GET_FIRST_MEAL_QUERY);

    if(!firstMeal || firstMeal.length === 0) {
      return res.status(404).json({ error: "No available meals."});
    }
    res.json(firstMeal[0]);
  } catch (error) {
    console.error("Fetching Error:", error);
    res.status(500).json({ error: "Not successful" });
  }
});

apiRouter.get("/last-meal", async (req, res) => {
  try{
    const GET_LAST_MEAL_QUERY = "SELECT * FROM meal ORDER BY ID DESC LIMIT 1;";
    const [lastMeal, schema] = await knex.raw(GET_LAST_MEAL_QUERY);

    if(!lastMeal || lastMeal.length ===0) {
      return res.status(404).json({ error: "No available meals."});
    }
    res.json(lastMeal[0]);
  } catch (error) {
    console.error("Fetching Error:", error);
    res.status(500).json({ error: "Not successful" });
  }
});