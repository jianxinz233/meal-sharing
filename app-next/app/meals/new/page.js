import React from "react";
import MealForm from "@/components/MealList/MealForm";
import { Box, Container } from "@mui/material";

function AddMealPage() {
  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ paddingTop: "20px", marginTop: "60px" }}>
          <MealForm />
        </Container>
      </Box>
    </>
  );
}

export default AddMealPage;
