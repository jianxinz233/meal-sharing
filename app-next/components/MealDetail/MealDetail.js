import React, { useState } from "react";
import {
  Container,
  CardMedia,
  Card,
  CardContent,
  Button,
  Typography,
  CardActions,
} from "@mui/material";
import ReservationModal from "../Tools/ReservationModal";

export default function MealDetail({ props }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const {
    id,
    title,
    when,
    location,
    price,
    max_reservations,
    description,
    imgUrl,
    available_reservations,
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
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Available Reservations: {available_reservations}
          </Typography>
          {available_reservations > 0 ? (
            <Button
              size="medium"
              color="primary"
              variant="contained"
              onClick={handleOpenModal}
            >
              Reserve
            </Button>
          ) : (
            <Button size="medium" variant="contained" disabled>
              Reserve
            </Button>
          )}
        </CardActions>
      </Card>
      <ReservationModal
        open={modalOpen}
        onClose={handleCloseModal}
        meal={props}
      />
    </Container>
  );
}
