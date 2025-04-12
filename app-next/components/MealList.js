"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
// import styles from "./MealList.module.css";
import Meal from "./Meal";
import { Grid, Container, Typography } from "@mui/material";

export default function MealList() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch(api("/meals"));
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        const data = await response.json();
        setMeals(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchMeals();
  }, []);
  if (loading) {
    return <p>Loading meals...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (meals.length === 0) {
    return <p>No meals found</p>;
  }
  return (
    <Container maxWidth="lg" sx={{ padding: "10px" }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        All Meals
      </Typography>
      <Grid
        container
        spacing={3}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
      >
        {meals.map((meal) => (
          <Grid key={meal.id}>
            <Meal props={meal} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
