"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import api from "@/utils/api";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

export default function MealForm({ meal }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    imgUrl: "",
    when: null,
    location: "",
    price: "",
    max_reservations: "",
    description: "",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMeal = {
      title: formData.title,
      imgUrl: formData.imgUrl,
      when: dayjs(formData.when).format("YYYY-MM-DD HH:mm:ss"),
      location: formData.location,
      price: formData.price,
      max_reservations: formData.max_reservations,
      description: formData.description,
    };
    try {
      const response = await fetch(api(`/meals`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeal),
      });

      if (response.ok) {
        router.push("/meals");
        alert("Meal created successfully");
        console.log("Meal created successfully");
      } else {
        console.error("Failed to create meal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Container maxWidth="lg" sx={{ padding: "10px" }}>
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
        Create a new meal
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 500,
          margin: "0 auto",
        }}
      >
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          value={formData.title}
          onChange={handleInput}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="When"
              name="when"
              value={formData.when}
              onChange={(newValue) =>
                setFormData({ ...formData, when: newValue })
              }
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          name="location"
          label="Location"
          variant="outlined"
          value={formData.location}
          onChange={handleInput}
        />
        <TextField
          name="price"
          label="Price"
          variant="outlined"
          type="number"
          value={formData.price}
          onChange={handleInput}
        />
        <TextField
          name="max_reservations"
          label="Max Reservations"
          variant="outlined"
          type="number"
          value={formData.max_reservations}
          onChange={handleInput}
        />
        <TextField
          name="imgUrl"
          label="Image URL"
          variant="outlined"
          value={formData.imgUrl}
          onChange={handleInput}
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInput}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}
