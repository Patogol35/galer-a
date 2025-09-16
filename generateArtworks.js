const fs = require("fs");

const categories = [
  "Renacimiento",
  "Barroco",
  "Romanticismo",
  "Impresionismo",
  "Postimpresionismo",
  "Cubismo",
  "Surrealismo",
  "Expresionismo",
  "Arte Moderno",
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
  "Andy Warhol",
];

// Generar X obras ficticias
function generateArtworks(count = 30) {
  const artworks = [];

  for (let i = 1; i <= count; i++) {
    const artist = artists[Math.floor(Math.random() * artists.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const year = 1400 + Math.floor(Math.random() * 600); // año entre 1400 y 2000

    artworks.push({
      id: i,
      title: `Obra ${i}`,
      artist,
      year,
      category,
      image: `https://picsum.photos/seed/art${i}/600/400`, // imágenes random
    });
  }

  return artworks;
}

// Generar y guardar en JSON
const artworks = generateArtworks(40); // puedes cambiar el número
fs.writeFileSync("./src/data/artworks.json", JSON.stringify(artworks, null, 2));

console.log("✅ artworks.json generado con", artworks.length, "obras");
