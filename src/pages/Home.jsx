import React from "react";

import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";

import { useMovies } from "../context/MovieContext";

const Home = () => {
  const {
    trending,
    movies,
    query,
    loading,
    error,
    loadMore,
    page,
    totalPages,
  } = useMovies();

  const displayedMovies =
    query.trim()
      ? movies
      : trending;

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 5 }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 5,
        }}
      >
        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            fontSize: {
              xs: "2.2rem",
              md: "4rem",
            },
            mb: 1,
          }}
        >
          Discover Movies
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Search thousands of movies and discover
          what's trending.
        </Typography>

        <SearchBar />
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 4 }}
        >
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
        >
          {query
            ? `Search Results for "${query}"`
            : "Trending This Week"}
        </Typography>
      </Box>

      {loading &&
      displayedMovies.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 10,
          }}
        >
          <CircularProgress size={50} />
        </Box>
      ) : (
        <>
          <MovieGrid
            movies={displayedMovies}
          />

          {query &&
            page < totalPages &&
            movies.length > 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  mt: 5,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading
                    ? "Loading..."
                    : "Load More"}
                </Button>
              </Box>
            )}
        </>
      )}

      <Box
        sx={{
          mt: 8,
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          This product uses the TMDB API but is
          not endorsed or certified by TMDB.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
