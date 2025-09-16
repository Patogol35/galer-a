const fs = require("fs");

// Tus 8 obras famosas
const famousArtworks = [
  {
    id: 1,
    title: "La noche estrellada",
    artist: "Vincent van Gogh",
    year: 1889,
    category: "Postimpresionismo",
    image: "https://uploads6.wikiart.org/images/vincent-van-gogh/the-starry-night-1889.jpg"
  },
  {
    id: 2,
    title: "La joven de la perla",
    artist: "Johannes Vermeer",
    year: 1665,
    category: "Barroco",
    image: "https://uploads4.wikiart.org/images/johannes-vermeer/girl-with-a-pearl-earring.jpg"
  },
  {
    id: 3,
    title: "Guernica",
    artist: "Pablo Picasso",
    year: 1937,
    category: "Cubismo",
    image: "https://uploads2.wikiart.org/images/pablo-picasso/guernica-1937.jpg"
  },
  {
    id: 4,
    title: "El nacimiento de Venus",
    artist: "Sandro Botticelli",
    year: 1486,
    category: "Renacimiento",
    image: "https://uploads8.wikiart.org/images/sandro-botticelli/the-birth-of-venus.jpg"
  },
  {
    id: 5,
    title: "La persistencia de la memoria",
    artist: "Salvador Dalí",
    year: 1931,
    category: "Surrealismo",
    image: "https://uploads0.wikiart.org/images/salvador-dali/the-persistence-of-memory-1931.jpg"
  },
  {
    id: 6,
    title: "La Gioconda",
    artist: "Leonardo da Vinci",
    year: 1503,
    category: "Renacimiento",
    image: "https://uploads1.wikiart.org/images/leonardo-da-vinci/mona-lisa.jpg"
  },
  {
    id: 7,
    title: "El grito",
    artist: "Edvard Munch",
    year: 1893,
    category: "Expresionismo",
    image: "https://uploads0.wikiart.org/images/edvard-munch/the-scream-1893.jpg"
  },
  {
    id: 8,
    title: "Las meninas",
    artist: "Diego Velázquez",
    year: 1656,
    category: "Barroco",
    image: "https://uploads0.wikiart.org/images/diego-velazquez/las-meninas-1656.jpg"
  }
];

// Datos aleatorios
const categories = [
  "Renacimiento",
  "Barroco",
  "Romanticismo",
  "Impresionismo",
  "Postimpresionismo",
  "Cubismo",
  "Surrealismo",
  "Expresionismo",
  "Arte Moderno"
];

const artists = [
  "Leonardo da Vinci",
  "Vincent van Gogh",
  "Pablo Picasso",
  "Claude Monet",
  "Salvador Dalí",
  "Diego Velázquez",
  "Frida Kahlo",
  "Edvard Munch",
  "Joan Miró",
  "Andy Warhol"
];

// Generar obras aleatorias
function generateRandomArtworks(count = 32, startingId = 9) {
  const artworks = [];
  for (let i = 0; i < count; i++) {
    const artist = artists[Math.floor(Math.random() * artists.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const year = 1400 + Math.floor(Math.random() * 600);
    artworks.push({
      id: startingId + i,
      title: `Obra ${startingId + i}`,
      artist,
      year,
      category,
      image: `https://picsum.photos/seed/art${startingId + i}/600/400`
    });
  }
  return artworks;
}

// Mezclar famosas + aleatorias
const artworks = [...famousArtworks, ...generateRandomArtworks(32)];

fs.writeFileSync("./src/data/artworks.json", JSON.stringify(artworks, null, 2));

console.log("✅ artworks.json generado con", artworks.length, "obras (famosas + aleatorias)");
