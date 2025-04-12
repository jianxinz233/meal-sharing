import React from "react";
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
  } = props;

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
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={imgUrl}
            alt={title}
            sx={{
              height: 200,
              width: 300,
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
              paragraph
              sx={{
                whiteSpace: "normal",
                wordWrap: "break-word",
                wordBreak: "break-word",
                overflow: "hidden",
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ padding: "16px" }}>
          <Button size="medium" color="primary" variant="contained">
            Reserve
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
