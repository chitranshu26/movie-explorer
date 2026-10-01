import React, { useEffect, useState } from "react";

import {
  Container,
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Rating,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  Avatar,
} from "@mui/material";

import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  PlayArrow,
} from "@mui/icons-material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getMovieDetails,
} from "../services/tmdb";

import { useMovies } from "../context/MovieContext";

const IMAGE_BASE =
  "https://image.tmdb.org/t/p/w500";

const BACKDROP_BASE =
  "https://image.tmdb.org/t/p/original";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    toggleFavorite,
    isFavorite,
  } = useMovies();

  const [movie, setMovie] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);

        const data =
          await getMovieDetails(id);

        setMovie(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load movie details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 15,
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container sx={{ py: 6 }}>
        <Alert severity="error">
          {error || "Movie not found."}
        </Alert>

        <Button
          sx={{ mt: 3 }}
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack />}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  const trailer =
    movie.videos?.results?.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );

  const cast =
    movie.credits?.cast?.slice(0, 8) || [];

  return (
    <Box>
      <Box
        sx={{
          minHeight: {
            xs: "auto",
            md: 550,
          },
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,.82),
              rgba(0,0,0,.88)
            ),
            url(${
              movie.backdrop_path
                ? `${BACKDROP_BASE}${movie.backdrop_path}`
                : ""
            })
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          py: 6,
        }}
      >
        <Container maxWidth="xl">
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBack />}
            sx={{
              color: "white",
              mb: 4,
            }}
          >
            Back
          </Button>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 5,
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
            }}
          >
            <Box
              component="img"
              src={
                movie.poster_path
                  ? `${IMAGE_BASE}${movie.poster_path}`
                  : "https://via.placeholder.com/500x750"
              }
              alt={movie.title}
              sx={{
                width: {
                  xs: 220,
                  sm: 280,
                },
                borderRadius: 3,
                boxShadow: 10,
              }}
            />

            <Box
              sx={{
                maxWidth: 800,
                textAlign: {
                  xs: "center",
                  md: "left",
                },
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
                }}
              >
                {movie.title}
              </Typography>

              <Typography
                sx={{
                  opacity: 0.8,
                  mb: 2,
                }}
              >
                {movie.release_date || "N/A"}
                {" | "}
                {movie.runtime
                  ? `${movie.runtime} min`
                  : "Runtime N/A"}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                justifyContent={{
                  xs: "center",
                  md: "flex-start",
                }}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 3 }}
              >
                {movie.genres?.map(
                  (genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      sx={{
                        color: "white",
                        borderColor:
                          "rgba(255,255,255,.5)",
                      }}
                      variant="outlined"
                    />
                  )
                )}
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: {
                    xs: "center",
                    md: "flex-start",
                  },
                  mb: 3,
                }}
              >
                <Rating
                  value={
                    (movie.vote_average || 0) /
                    2
                  }
                  precision={0.1}
                  readOnly
                />

                <Typography
                  sx={{ ml: 2 }}
                  fontWeight={700}
                >
                  {movie.vote_average?.toFixed(
                    1
                  ) || "N/A"}
                  / 10
                </Typography>
              </Box>

              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                Overview
              </Typography>

              <Typography
                sx={{
                  lineHeight: 1.8,
                  opacity: 0.9,
                }}
              >
                {movie.overview ||
                  "No overview available."}
              </Typography>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
                sx={{ mt: 4 }}
              >
                <Button
                  variant="contained"
                  color="error"
                  startIcon={
                    isFavorite(movie.id) ? (
                      <Favorite />
                    ) : (
                      <FavoriteBorder />
                    )
                  }
                  onClick={() =>
                    toggleFavorite(movie)
                  }
                >
                  {isFavorite(movie.id)
                    ? "Remove Favorite"
                    : "Add to Favorites"}
                </Button>

                {trailer && (
                  <Button
                    variant="outlined"
                    startIcon={
                      <PlayArrow />
                    }
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      color: "white",
                      borderColor:
                        "rgba(255,255,255,.7)",
                    }}
                  >
                    Watch Trailer
                  </Button>
                )}
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="xl"
        sx={{ py: 6 }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ mb: 3 }}
        >
          Cast
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(150px, 1fr))",
            gap: 3,
          }}
        >
          {cast.map((person) => (
            <Card
              key={person.cast_id || person.id}
              sx={{ borderRadius: 3 }}
            >
              <CardMedia
                component="img"
                height="220"
                image={
                  person.profile_path
                    ? `${IMAGE_BASE}${person.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Photo"
                }
                alt={person.name}
              />

              <Box sx={{ p: 2 }}>
                <Typography
                  fontWeight={700}
                  noWrap
                >
                  {person.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap
                >
                  {person.character}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default MovieDetails;
