"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Grid, Container, Typography, Box } from "@mui/material";
import { useParams } from "next/navigation";
import MealDetail from "@/components/MealDetail/MealDetail";

export default function MealDetailPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("Meal ID is required");
      setLoading(false);
      return;
    }
    async function fetchMealDetail() {
      try {
        const response = await fetch(api(`/meals/${id}`));
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        const data = await response.json();
        setMeal(data[0]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchMealDetail();
  }, [id]);

  if (loading) {
    return <p>Loading meals...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!meal) {
    return <Typography variant="h6">Meal not found</Typography>;
  }
  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          textAlign: "center",
        }}
      >
        <MealDetail props={meal} />
      </Box>
    </>
  );
}
