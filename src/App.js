import React, { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";

import { MovieProvider } from "./context/MovieContext";

const ProtectedRoute = ({
  children,
}) => {
  const user =
    localStorage.getItem("movieUser");

  return user ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

function App() {
  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem(
        "darkMode"
      ) === "true"
    );

  const toggleDarkMode = (value) => {
    setDarkMode(value);

    localStorage.setItem(
      "darkMode",
      String(value)
    );
  };

  const theme = createTheme({
    palette: {
      mode: darkMode
        ? "dark"
        : "light",

      primary: {
        main: "#1976d2",
      },

      secondary: {
        main: "#e91e63",
      },
    },

    typography: {
      fontFamily:
        "Inter, Arial, sans-serif",
    },

    shape: {
      borderRadius: 12,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <MovieProvider>
          <Navbar
            darkMode={darkMode}
            setDarkMode={toggleDarkMode}
          />

          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />

            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute>
                  <MovieDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
          </Routes>
        </MovieProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
