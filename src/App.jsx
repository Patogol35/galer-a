import { useState, useMemo } from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Gallery from "./components/Gallery";

export default function App() {
  const [mode, setMode] = useState("light");
  const [tab, setTab] = useState(0); // 0 = Galería, 1 = Favoritos

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
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleChangeTab = (_, newValue) => {
    setTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh" }}>
        {/* Navbar */}
        <AppBar position="static" elevation={2}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold">
              🎨 Galería de Arte
            </Typography>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            centered
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Galería" />
            <Tab label="Favoritos" />
          </Tabs>
        </AppBar>

        {/* Contenido */}
        {tab === 0 && <Gallery />}
        {tab === 1 && (
          <Gallery
            onlyFavorites
            onGoToGallery={() => setTab(0)} // callback para botón "Ir a la Galería"
          />
        )}
      </Box>
    </ThemeProvider>
  );
            }
