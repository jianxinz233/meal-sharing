import React from "react";
import MealList from "@/components/MealList/MealList";
import { Container, Typography, Box } from "@mui/material";

function MealPage() {
  return (
    <>
      <Box sx={{ height: "calc(100vh - 64px)" }}>
        <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Welcome to the Meal Sharing
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Find your next meal
          </Typography>
          <Box sx={{ padding: "20px" }}>
            <MealList />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default MealPage;
