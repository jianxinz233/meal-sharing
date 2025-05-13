import React from "react";
import MealForm from "@/components/MealList/MealForm";
import { Box, Container } from "@mui/material";

function AddMealPage() {
  return (
    <>
      <Box sx={{ height: "calc(100vh - 64px)" }}>
        <Container
          maxWidth="lg"
          sx={{ paddingTop: "20px", marginTop: "100px" }}
        >
          <MealForm />
        </Container>
      </Box>
    </>
  );
}

export default AddMealPage;
