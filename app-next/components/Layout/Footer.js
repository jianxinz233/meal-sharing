import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import { Facebook, Instagram, GitHub } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f8f8",
        padding: "20px 0",
        width: "100%",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} Meal Sharing. All rights reserved.
        </Typography>
        <Typography variant="body1" align="center">
          Follow us on:
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginTop: 1,
          }}
        >
          <Link href="https://www.facebook.com" target="_blank">
            <Facebook fontSize="large" color="primary" />
          </Link>
          <Link href="https://www.instagram.com" target="_blank">
            <Instagram fontSize="large" color="primary" />
          </Link>
          <Link href="https://github.com" target="_blank">
            <GitHub fontSize="large" color="primary" />
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
