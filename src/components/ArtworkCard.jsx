import { Card, CardActionArea, CardMedia, CardContent, Typography, IconButton, Box } from "@mui/material";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ArtworkCard({ artwork, onClick, isFavorite, toggleFavorite }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card
        sx={{ borderRadius: "20px", boxShadow: 4, overflow: "hidden", position: "relative" }}
      >
        {/* Botón de favorito */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(artwork.id);
          }}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "rgba(0,0,0,0.4)",
            color: "white",
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
            zIndex: 2,
          }}
        >
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>

        {/* Card normal */}
        <CardActionArea onClick={() => onClick(artwork)}>
          <CardMedia
            component="img"
            height="250"
            image={artwork.image}
            alt={`${artwork.title} por ${artwork.artist}`}
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h6" fontWeight="bold">{artwork.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {artwork.artist} • {artwork.year}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}
