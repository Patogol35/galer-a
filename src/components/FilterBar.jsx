import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function FilterBar({ filter, setFilter, categories }) {
  return (
    <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Categoría</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Categoría"
        >
          <MenuItem value="Todos">Todos</MenuItem>
          {categories.map((cat, idx) => (
            <MenuItem key={idx} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
