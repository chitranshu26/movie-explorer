import React, { useState } from "react";

import {
  Box,
  TextField,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { useMovies } from "../context/MovieContext";

const SearchBar = () => {
  const { search, query } =
    useMovies();

  const [value, setValue] =
    useState(query);

  const handleSearch = () => {
    search(value, 1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        width: "100%",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <TextField
        fullWidth
        value={value}
        onChange={(event) =>
          setValue(event.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Search movies..."
        size="medium"
      />

      <Button
        variant="contained"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
        sx={{
          px: { xs: 2, sm: 4 },
          whiteSpace: "nowrap",
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
