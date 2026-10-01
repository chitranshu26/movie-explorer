import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";

import {
  DarkMode,
  LightMode,
  Favorite,
  Home,
  Logout,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("movieUser");

  const logout = () => {
    localStorage.removeItem("movieUser");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={3}
    >
      <Toolbar
        sx={{
          maxWidth: "1400px",
          width: "100%",
          margin: "auto",
        }}
      >
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          Movie Explorer
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.3, sm: 1 },
          }}
        >
          <Button
            color="inherit"
            startIcon={<Home />}
            component={Link}
            to="/"
          >
            <Box
              component="span"
              sx={{
                display: { xs: "none", sm: "inline" },
              }}
            >
              Home
            </Box>
          </Button>

          <Button
            color="inherit"
            startIcon={<Favorite />}
            component={Link}
            to="/favorites"
          >
            <Box
              component="span"
              sx={{
                display: { xs: "none", sm: "inline" },
              }}
            >
              Favorites
            </Box>
          </Button>

          <IconButton
            color="inherit"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode ? (
              <LightMode />
            ) : (
              <DarkMode />
            )}
          </IconButton>

          {isLoggedIn && (
            <IconButton
              color="inherit"
              onClick={logout}
            >
              <Logout />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
