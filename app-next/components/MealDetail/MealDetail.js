import React from "react";
import {
  Container,
  CardMedia,
  Card,
  CardContent,
  Button,
  Typography,
  CardActions,
} from "@mui/material";

export default function MealDetail({ props }) {
  const {
    id,
    title,
    when,
    location,
    price,
    max_reservations,
    description,
    imgUrl,
  } = props;
  const imageUrl = `/${imgUrl.startsWith("/") ? imgUrl.slice(1) : imgUrl}`;

  return (
    <Container maxWidth="lg">
      <Card
        sx={{
          maxWidth: 800,
          margin: "0 auto",
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          sx={{
            width: "100%",
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Location: {location}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Date: {new Date(when).toLocaleString()}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Price: {price}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Max Reservations: {max_reservations}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: "16px", justifyContent: "center" }}>
          <Button size="medium" color="primary" variant="contained">
            Reserve
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
