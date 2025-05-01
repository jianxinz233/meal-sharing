import React from "react";
import MealList from "@/components/MealList/MealList";
import { Container, Typography, Box, useMediaQuery } from "@mui/material";
import FilterTool from "@/components/Tools/FilterTool";

function MealPage() {
  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "40px", marginTop: "80px" }}>
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
          All Meals
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          align="center"
          sx={{
            color: "#555",
            mb: 4,
          }}
        >
          Find your next meal experience.
        </Typography>

        <Box
          sx={{
            padding: "20px",
          }}
        >
          <MealList />
        </Box>
      </Container>
    </>
  );
}

export default MealPage;
