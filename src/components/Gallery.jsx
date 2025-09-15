import { Grid, Container } from "@mui/material";
import { useState, useMemo } from "react";
import ArtworkCard from "./ArtworkCard";
import ArtworkModal from "./ArtworkModal";
import FilterBar from "./FilterBar";
import artworks from "../data/artworks.json";

export default function Gallery() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [filter, setFilter] = useState("Todos");

  // Obtener categorías únicas desde el JSON
  const categories = [...new Set(artworks.map((art) => art.category))];

  // Filtrar obras según la categoría seleccionada
  const filteredArtworks = useMemo(() => {
    if (filter === "Todos") return artworks;
    return artworks.filter((art) => art.category === filter);
  }, [filter]);

  return (
    <Container sx={{ py: 5 }}>
      {/* Barra de filtros */}
      <FilterBar filter={filter} setFilter={setFilter} categories={categories} />

      {/* Grid de obras */}
      <Grid container spacing={3}>
        {filteredArtworks.map((art) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={art.id}>
            <ArtworkCard artwork={art} onClick={setSelectedArtwork} />
          </Grid>
        ))}
      </Grid>

      {/* Modal para ver obra en detalle */}
      <ArtworkModal 
        open={Boolean(selectedArtwork)} 
        artwork={selectedArtwork} 
        onClose={() => setSelectedArtwork(null)} 
      />
    </Container>
  );
}
