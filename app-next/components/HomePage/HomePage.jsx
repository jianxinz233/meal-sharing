import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import "./HomePage.css";
import React from "react";
import MealList from "../MealList";
import { Container, Typography, Box } from "@mui/material";

// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <>
      {/* <a href="https://www.hackyourfuture.dk/" target="_blank" className="link">
        <Image
          src={HYFLogo.src}
          width={HYFLogo.width}
          height={HYFLogo.height}
          className="logo"
        />
      </a>
      <a href="/nested" className="link">
        <span className="message">Go to the nested page</span>
      </a> */}
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
    </>
  );
}

export default HomePage;
