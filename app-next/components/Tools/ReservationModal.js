import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ReservationModal({
  open,
  onClose,
  meal,
  onReservationSuccess,
}) {
  const [guestNumber, setGuestNumber] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setGuestNumber(1);
      setName("");
      setPhone("");
      setEmail("");
      setError(null);
      setLoading(false);
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(api(`/reservations`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meal_id: meal.id,
          number_of_guests: guestNumber,
          contact_name: name,
          contact_phonenumber: phone,
          contact_email: email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to make reservation");
      } else {
        onReservationSuccess && onReservationSuccess(data);
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" mb={2}>
          Reserve Meal: {meal.title}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Number of Guests"
          type="number"
          inputProps={{ min: 1, max: meal.available_reservations }}
          fullWidth
          required
          margin="normal"
          value={guestNumber}
          onChange={(e) => setGuestNumber(Number(e.target.value))}
        />
        <TextField
          label="Name"
          fullWidth
          required
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Phone Number"
          fullWidth
          required
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Reserving..." : "Reserve"}
        </Button>
      </Box>
    </Modal>
  );
}
