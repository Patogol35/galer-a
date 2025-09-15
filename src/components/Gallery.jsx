import { Grid, Container, Typography, Box, Button } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import ArtworkCard from "./ArtworkCard";
import ArtworkModal from "./ArtworkModal";
import FilterBar from "./FilterBar";
import artworks from "../data/artworks.json";

export default function Gallery({ onlyFavorites = false, onGoToGallery }) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const categories = useMemo(
    () => [...new Set(artworks.map((art) => art.category))],
    []
  );

  const filteredArtworks = useMemo(() => {
    let result = artworks;

    if (onlyFavorites) {
      result = result.filter((art) => favorites.includes(art.id));
    } else {
      if (filter !== "Todos") {
        result = result.filter((art) => art.category === filter);
      }
    }

    if (search.trim() !== "") {
      const term = search.toLowerCase();
      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(term) ||
          art.artist.toLowerCase().includes(term)
      );
    }

    if (sort === "asc") {
      result = [...result].sort((a, b) => a.year - b.year);
    } else if (sort === "desc") {
      result = [...result].sort((a, b) => b.year - a.year);
    }

    return result;
  }, [filter, search, sort, favorites, onlyFavorites]);

  return (
    <Container sx={{ py: 5 }}>
      {!onlyFavorites && (
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          categories={categories}
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />
      )}

      {onlyFavorites && filteredArtworks.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            mt: 10,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" gutterBottom>
            ⭐ Aún no tienes favoritos
          </Typography>
          <Typography variant="body2" gutterBottom>
            Explora la galería y marca tus obras favoritas para verlas aquí.
          </Typography>
          <Button
            variant="contained"
            onClick={onGoToGallery}
            sx={{ mt: 2, borderRadius: "20px", px: 3 }}
          >
            Ir a la Galería 🎨
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredArtworks.map((art) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={art.id}>
              <ArtworkCard
                artwork={art}
                onClick={setSelectedArtwork}
                isFavorite={favorites.includes(art.id)}
                toggleFavorite={toggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <ArtworkModal
        open={Boolean(selectedArtwork)}
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </Container>
  );
}
