import React from "react";
import SearchMealResult from "@/components/MealList/SearchMealResult";
import { Container } from "@mui/material";

function SearchPage() {
  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "20px", marginTop: "60px" }}>
        <SearchMealResult />
      </Container>
    </>
  );
}

export default SearchPage;
