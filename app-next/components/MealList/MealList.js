"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import Meal from "./Meal";
import { Grid, Container, Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import FilterTool from "../Tools/FilterTool";

export default function MealList() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);

  const [filters, setFilters] = useState({
    maxPrice: "",
    availableReservations: null,
    dateAfter: "",
    dateBefore: "",
  });

  const [sortOptions, setSortOptions] = useState({
    sortKey: "",
    sortDir: "",
  });

  const fetchMeals = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();

      for (const key in filters) {
        if (
          filters[key] !== "" &&
          filters[key] !== null &&
          filters[key] !== undefined
        ) {
          query.append(key, filters[key].toString());
        }
      }

      if (sortOptions.sortKey) {
        query.append("sortKey", sortOptions.sortKey);
      }
      if (sortOptions.sortDir) {
        query.append("sortDir", sortOptions.sortDir);
      }

      const url = query.toString() ? `/meals?${query}` : "/meals";
      console.log(url); // Log the final URL to inspect the query string

      const response = await fetch(api(url));
      if (response.ok) {
        const data = await response.json();
        setMeals(data);
      } else if (response.status === 400) {
        setMeals([]);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch meals");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals(filters, sortOptions);
  }, [filters, sortOptions]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setFilterOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      maxPrice: "",
      availableReservations: false,
      dateAfter: "",
      dateBefore: "",
    };
    setFilters(clearedFilters);
    setFilterOpen(false);
  };

  const handleApplySorting = (newSortOptions) => {
    setSortOptions(newSortOptions);
    setSortOpen(false);
  };

  if (loading) {
    return <p>Loading meals...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (meals.length === 0) {
    return <p>No meals found</p>;
  } else {
    return (
      <Container maxWidth="lg" sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Link href="/meals/new">
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Add Meal
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Button variant="outlined" onClick={() => setFilterOpen(true)}>
            Filter
          </Button>
          <Button variant="outlined" onClick={() => setSortOpen(true)}>
            Sort
          </Button>
        </Box>
        <Grid
          container
          spacing={3}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
        >
          {meals.map((meal) => (
            <Grid key={meal.id}>
              <Meal props={meal} />
            </Grid>
          ))}
        </Grid>
        <FilterTool
          isFilterOpen={isFilterOpen}
          setFilterOpen={setFilterOpen}
          isSortOpen={isSortOpen}
          setSortOpen={setSortOpen}
          filters={filters}
          sortOptions={sortOptions}
          setSortOptions={setSortOptions}
          onApplyFilters={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </Container>
    );
  }
}
