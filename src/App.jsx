import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import Gallery from "./components/Gallery";

export default function App() {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ borderRadius: 0 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🎨 Mi Galería de Arte
          </Typography>

          <IconButton
            color="inherit"
            onClick={() => setShowFavorites(false)}
            aria-label="galería"
          >
            <HomeIcon />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => setShowFavorites(true)}
            aria-label="favoritos"
          >
            <FavoriteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {showFavorites ? (
          <Gallery
            onlyFavorites
            onGoToGallery={() => setShowFavorites(false)}
          />
        ) : (
          <Gallery />
        )}
      </Container>
    </>
  );
}
