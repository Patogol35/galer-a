import { useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Gallery from "./components/Gallery";

export default function App() {
  const [mode, setMode] = useState("light");

  // Cargar preferencia de tema desde localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) setMode(savedMode);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f5f5f5", paper: "#ffffff" },
              }
            : {
                background: { default: "#121212", paper: "#1e1e1e" },
              }),
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", next);
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh" }}>
        <AppBar position="static" elevation={2}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold">
              🎨 Galería de Arte
            </Typography>
            <IconButton onClick={toggleTheme} color="inherit" aria-label="cambiar tema">
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Gallery />
      </Box>
    </ThemeProvider>
  );
}
