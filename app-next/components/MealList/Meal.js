import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Button,
  Grid,
  CardActions,
} from "@mui/material";
import Link from "next/link";
import ReservationModal from "../Tools/ReservationModal";

export default function Meal({ props }) {
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

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <Grid
      sx={{
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "320px",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link
          href={`/meals/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={imgUrl}
              alt={title}
              sx={{
                height: 200,
                width: 320,
                objectFit: "cover",
              }}
            />

            <CardContent sx={{ padding: "16px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Date: {new Date(when).toLocaleString()}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Location: {location}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Price: {price}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Max Reservations: {max_reservations}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Description:
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "auto",
                }}
              >
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
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
    </Grid>
  );
}
