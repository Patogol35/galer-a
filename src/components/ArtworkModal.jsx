import { Dialog, DialogContent, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ArtworkModal({ open, artwork, onClose }) {
  if (!artwork) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogContent sx={{ position: "relative", p: 3 }}>
        <IconButton 
          onClick={onClose} 
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <img 
          src={artwork.image} 
          alt={artwork.title} 
          style={{ width: "100%", borderRadius: "12px" }} 
        />
        <Typography variant="h5" fontWeight="bold" mt={2}>{artwork.title}</Typography>
        <Typography variant="body1" color="text.secondary">
          {artwork.artist} ({artwork.year})
        </Typography>
        <Typography variant="body2" mt={1}>
          Categoría: {artwork.category}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
