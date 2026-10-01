import React from "react";

import {
  Container,
  Typography,
  Box,
} from "@mui/material";

import MovieGrid from "../components/MovieGrid";

import { useMovies } from "../context/MovieContext";

const Favorites = () => {
  const { favorites } =
    useMovies();

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 5 }}
    >
      <Typography
        variant="h3"
        fontWeight={800}
        sx={{ mb: 1 }}
      >
        My Favorites
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Your saved movies are stored locally
        in your browser.
      </Typography>

      {favorites.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
          }}
        >
          <Typography
            variant="h5"
            color="text.secondary"
          >
            No favorite movies yet.
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Search for movies and click the favorite button
            button to save them.
          </Typography>
        </Box>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </Container>
  );
};

export default Favorites;
