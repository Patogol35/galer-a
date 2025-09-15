import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function ArtworkCard({ artwork, onClick }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: 4,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => onClick(artwork)}
      >
        <CardActionArea sx={{ flexGrow: 1 }}>
          <CardMedia
            component="img"
            image={artwork.image}
            alt={artwork.title}
            sx={{
              height: 250,
              objectFit: "cover",
            }}
          />
          <CardContent>
            <Typography variant="h6" fontWeight="bold" noWrap>
              {artwork.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {artwork.artist} • {artwork.year}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}
