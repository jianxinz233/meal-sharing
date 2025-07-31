import React from "react";
import { Container, Box, Typography, Card, Rating } from "@mui/material";

export default function Review({ props }) {
  const {
    review_id,
    review_title,
    review_description,
    user_name,
    stars,
    created_date,
  } = props;

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" component="h2" gutterBottom>
        Reviews
      </Typography>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Typography variant="body1" fontWeight="bold">
            {review_title}
          </Typography>
          <Rating value={stars} readOnly size="small" sx={{ ml: 1 }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {user_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {new Date(created_date).toLocaleDateString()}
          </Typography>
        </Box>
        <Typography variant="body2">{review_description}</Typography>
      </Card>
    </Container>
  );
}
