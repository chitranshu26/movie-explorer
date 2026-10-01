import React from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import MovieCard from "./MovieCard";

const MovieGrid = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <Typography
        align="center"
        sx={{ py: 8 }}
        color="text.secondary"
      >
        No movies found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill, minmax(190px, 1fr))",
        gap: 3,
      }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </Box>
  );
};

export default MovieGrid;
