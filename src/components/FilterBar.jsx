import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

export default function FilterBar({
  filter,
  setFilter,
  categories,
  search,
  setSearch,
  sort,
  setSort,
}) {
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
      }}
    >
      {/* Filtro por categoría */}
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel>Categoría</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Categoría"
        >
          <MenuItem value="Todos">Todos</MenuItem>
          {categories.map((cat, idx) => (
            <MenuItem key={idx} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Búsqueda por texto */}
      <TextField
        label="Buscar"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Ordenar por año */}
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel>Ordenar por año</InputLabel>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          label="Ordenar por año"
        >
          <MenuItem value="none">Sin orden</MenuItem>
          <MenuItem value="asc">Más antiguo → Reciente</MenuItem>
          <MenuItem value="desc">Más reciente → Antiguo</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
