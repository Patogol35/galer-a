  import { Grid, Container } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import ArtworkCard from "./ArtworkCard";
import ArtworkModal from "./ArtworkModal";
import FilterBar from "./FilterBar";
import artworks from "../data/artworks.json";

export default function Gallery({ onlyFavorites = false }) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos de localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Categorías únicas
  const categories = useMemo(
    () => [...new Set(artworks.map((art) => art.category))],
    []
  );

  // Filtrar + buscar + ordenar
  const filteredArtworks = useMemo(() => {
    let result = artworks;

    // Si está en modo "solo favoritos"
    if (onlyFavorites) {
      result = result.filter((art) => favorites.includes(art.id));
    } else {
      // Filtro normal
      if (filter !== "Todos") {
        result = result.filter((art) => art.category === filter);
      }
    }

    // Buscar
    if (search.trim() !== "") {
      const term = search.toLowerCase();
      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(term) ||
          art.artist.toLowerCase().includes(term)
      );
    }

    // Ordenar
    if (sort === "asc") {
      result = [...result].sort((a, b) => a.year - b.year);
    } else if (sort === "desc") {
      result = [...result].sort((a, b) => b.year - a.year);
    }

    return result;
  }, [filter, search, sort, favorites, onlyFavorites]);

  return (
    <Container sx={{ py: 5 }}>
      {/* Barra de filtros solo si NO estamos en la pestaña de favoritos */}
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

      {/* Grid de obras */}
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

      {/* Modal */}
      <ArtworkModal
        open={Boolean(selectedArtwork)}
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </Container>
  );
}
