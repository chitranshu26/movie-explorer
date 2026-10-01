import React from "react";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Rating,
  Box,
  Chip,
} from "@mui/material";

import {
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { useMovies } from "../context/MovieContext";

const IMAGE_BASE =
  "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const {
    toggleFavorite,
    isFavorite,
  } = useMovies();

  const year = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  const rating =
    movie.vote_average || 0;

  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        cursor: "pointer",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all .25s ease",
        "&:hover": {
          transform: "translateY(-7px)",
          boxShadow: 8,
        },
      }}
      onClick={() =>
        navigate(`/movie/${movie.id}`)
      }
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="380"
          image={
            movie.poster_path
              ? `${IMAGE_BASE}${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Poster"
          }
          alt={movie.title}
        />

        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(movie);
          }}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            backgroundColor:
              "rgba(0,0,0,.65)",
            color: "white",
            "&:hover": {
              backgroundColor:
                "rgba(0,0,0,.85)",
            },
          }}
        >
          {isFavorite(movie.id) ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      </Box>

      <CardContent>
        <Typography
          variant="h6"
          fontWeight={700}
          noWrap
        >
          {movie.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 1,
          }}
        >
          <Chip
            label={year}
            size="small"
          />

          <Rating
            value={rating / 2}
            precision={0.1}
            readOnly
            size="small"
          />

          <Typography
            variant="body2"
            fontWeight={600}
          >
            {rating
              ? rating.toFixed(1)
              : "N/A"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
