import { Dialog, DialogContent, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ArtworkModal({ open, artwork, onClose }) {
  if (!artwork) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent sx={{ position: "relative", p: 3 }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "background.paper",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          component="img"
          src={artwork.image}
          alt={artwork.title}
          sx={{
            width: "100%",
            maxHeight: "70vh",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: 3,
            mb: 2,
          }}
        />

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {artwork.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {artwork.artist} ({artwork.year})
        </Typography>
        <Typography variant="body2">
          Categoría: {artwork.category}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
