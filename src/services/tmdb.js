import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";

const TOKEN = process.env.REACT_APP_TMDB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const getTrendingMovies = async () => {
  const response = await api.get("/trending/movie/week");
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await api.get("/search/movie", {
    params: {
      query: query,
      page: page,
      include_adult: false,
      language: "en-US",
    },
  });

  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      language: "en-US",
      append_to_response: "credits,videos",
    },
  });

  return response.data;
};

export default api;
