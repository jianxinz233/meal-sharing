"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Grid, Container, Typography } from "@mui/material";
import api from "@/utils/api";
import Meal from "./Meal";

export default function SearchMealResult() {
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("title");

  useEffect(() => {
    async function fetchMatchMeals() {
      if (!query) {
        setFilteredMeals([]);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          api(`/meals?title=${encodeURIComponent(query)}`)
        );
        const data = await response.json();
        setFilteredMeals(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMatchMeals();
  }, [query]);
  return (
    <Container maxWidth="lg" sx={{ padding: "10px" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 600,
          mb: 2,
          color: "#2d2d2d",
        }}
      >
        Search Results for: "{query}"
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid
          container
          spacing={3}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
        >
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <Grid key={meal.id}>
                <Meal props={meal} />
              </Grid>
            ))
          ) : (
            <Typography>No meals found.</Typography>
          )}
        </Grid>
      )}
    </Container>
  );
}
