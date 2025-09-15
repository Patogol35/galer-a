import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function ArtworkCard({ artwork, onClick }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card
        sx={{ borderRadius: "20px", boxShadow: 4, overflow: "hidden" }}
        onClick={() => onClick(artwork)}
      >
        <CardActionArea>
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
