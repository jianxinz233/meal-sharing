"use client";

import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

export default function SearchTool({ showButton = false }) {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      return;
    }
    router.push(
      `/search-results?title=${encodeURIComponent(searchInput.trim())}`
    );
    setSearchInput("");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextField
        placeholder="Search meals..."
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          minWidth: "250px",
        }}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        value={searchInput}
        InputProps={{
          startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
        }}
      />
      {showButton && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#5a8f75",
            "&:hover": {
              backgroundColor: "#467961",
            },
            borderRadius: 1,
            px: 4,
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      )}
    </Box>
  );
}
