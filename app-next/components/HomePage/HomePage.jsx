"use client";
import "./HomePage.css";
import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

function HomePage() {
  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          backgroundImage: "url(/meal_sharing_welcome.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: 600,
            mb: 3,
            textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          Welcome to Meal Sharing
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            mb: 4,
            textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
          }}
        >
          Find and share your next meal with us!
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search meals..."
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              minWidth: "250px",
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#5a8f75",
              "&:hover": {
                backgroundColor: "#467961",
              },
              borderRadius: 1,
              px: 4,
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
