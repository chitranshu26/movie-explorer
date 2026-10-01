import React, { useState } from "react";

import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !username.trim() ||
      !password.trim()
    ) {
      setError(
        "Please enter username and password."
      );
      return;
    }

    localStorage.setItem(
      "movieUser",
      username
    );

    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ py: 10 }}
    >
      <Paper
        elevation={8}
        sx={{
          p: {
            xs: 3,
            sm: 5,
          },
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={800}
          align="center"
          sx={{ mb: 1 }}
        >
          Welcome
        </Typography>

        <Typography
          color="text.secondary"
          align="center"
          sx={{ mb: 4 }}
        >
          Sign in to Movie Explorer
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
          >
            Login
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 3 }}
        >
          Demo login: enter any non-empty username and password
          username and password will work.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
