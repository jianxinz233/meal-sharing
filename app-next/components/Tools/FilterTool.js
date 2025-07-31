"use client";
import React, { useState } from "react";
import {
  Drawer,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";

export default function FilterTool({
  onApplyFilters,
  onClear,
  isFilterOpen,
  setFilterOpen,
  isSortOpen,
  setSortOpen,
  setSortOptions,
}) {
  const [filters, setFilters] = useState({
    maxPrice: "",
    availableReservations: false,
    dateAfter: "",
    dateBefore: "",
  });

  const [sortOptions, setLocalSortOptions] = useState({
    sortKey: "",
    sortDir: "",
  });

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSortChange = (event) => {
    const { name, value } = event.target;
    setLocalSortOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== "" && value !== false
      )
    );
    onApplyFilters(activeFilters);
    setFilterOpen(false);
  };

  const handleApplySorting = () => {
    if (sortOptions.sortKey && sortOptions.sortDir) {
      setSortOptions(sortOptions);
    }
    setSortOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      maxPrice: "",
      availableReservations: false,
      dateAfter: "",
      dateBefore: "",
    });
    onClear();
    setFilterOpen(false);
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={isFilterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <Box sx={{ width: 300, p: 2, paddingTop: "64px" }}>
          <Typography variant="h6">Filters</Typography>

          <TextField
            name="maxPrice"
            label="Max Price"
            type="number"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
            inputProps={{
              min: 0,
              step: 1,
            }}
          />
          <TextField
            name="dateAfter"
            label="Date After"
            type="date"
            value={filters.dateAfter}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="dateBefore"
            label="Date Before"
            type="date"
            value={filters.dateBefore}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="availableReservations"
                checked={filters.availableReservations}
                onChange={handleFilterChange}
              />
            }
            label="Available Reservations Only"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              onClick={handleApplyFilters}
              sx={{ mt: 2 }}
            >
              Apply Filters
            </Button>
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              sx={{ mt: 2 }}
            >
              Clear Filters
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={isSortOpen}
        onClose={() => setSortOpen(false)}
      >
        <Box sx={{ width: 300, p: 2, paddingTop: "64px" }}>
          <Typography variant="h6">Sort Options</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              name="sortKey"
              labelId="sort-by-label"
              value={sortOptions.sortKey}
              onChange={handleSortChange}
              label="Sort By"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.87)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "2px",
                  borderColor: "primary.main",
                },
              }}
            >
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="when">Date</MenuItem>
              <MenuItem value="max_reservations">Max Reservations</MenuItem>
              <MenuItem value="">None</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="sort-order-label">Order</InputLabel>
            <Select
              name="sortDir"
              labelId="sort-order-label"
              value={sortOptions.sortDir}
              onChange={handleSortChange}
              label="Order"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.87)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "2px",
                  borderColor: "primary.main",
                },
              }}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={() => setSortOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleApplySorting}>
              Apply
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
