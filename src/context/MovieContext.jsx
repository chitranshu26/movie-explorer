import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getTrendingMovies,
  searchMovies,
} from "../services/tmdb";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState(
    localStorage.getItem("lastSearch") || ""
  );

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("favorites")
      ) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTrendingMovies();

      setTrending(data.results || []);
    } catch (error) {
      console.error(error);
      setError(
        "Unable to load trending movies. Please check your TMDb token and internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const search = async (searchQuery, requestedPage = 1) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setQuery("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      localStorage.setItem(
        "lastSearch",
        searchQuery
      );

      setQuery(searchQuery);

      const data = await searchMovies(
        searchQuery,
        requestedPage
      );

      if (requestedPage === 1) {
        setMovies(data.results || []);
      } else {
        setMovies((previous) => [
          ...previous,
          ...(data.results || []),
        ]);
      }

      setPage(requestedPage);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to search movies. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (
      !loading &&
      page < totalPages &&
      query
    ) {
      search(query, page + 1);
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites((previous) => {
      const exists = previous.some(
        (item) => item.id === movie.id
      );

      if (exists) {
        return previous.filter(
          (item) => item.id !== movie.id
        );
      }

      return [...previous, movie];
    });
  };

  const isFavorite = (movieId) => {
    return favorites.some(
      (movie) => movie.id === movieId
    );
  };

  return (
    <MovieContext.Provider
      value={{
        trending,
        movies,
        favorites,
        loading,
        error,
        query,
        search,
        loadMore,
        toggleFavorite,
        isFavorite,
        totalPages,
        page,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () =>
  useContext(MovieContext);
