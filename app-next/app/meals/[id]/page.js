"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Grid, Container, Typography, Box } from "@mui/material";
import { useParams } from "next/navigation";
import MealDetail from "@/components/MealDetail/MealDetail";
import Review from "@/components/MealDetail/Review";

export default function MealDetailPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState();

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

    async function fetchReview() {
      try {
        const response = await fetch(api(`/meals/${id}/reviews`));

        if (response.status === 404) {
          setReviews([]);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchMealDetail();
    fetchReview();
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
    <Container
      maxWidth="lg"
      sx={{
        mt: 8,
        mb: 6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: { xs: "1 1 100%", md: 2 } }}>
          <MealDetail props={meal} />
        </Box>
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: 1 },
            width: { xs: "100%", md: "auto" },
          }}
        >
          {reviews.length === 0 ? (
            <Typography variant="h5" color="text.secondary">
              No reviews yet.
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {reviews.map((review) => (
                <Review key={review.review_id} props={review} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
