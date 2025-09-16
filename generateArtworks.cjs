const fs = require("fs");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Tus 8 obras famosas
const famousArtworks = [
  { id: 1, title: "La noche estrellada", artist: "Vincent van Gogh", year: 1889, category: "Postimpresionismo", image: "https://uploads6.wikiart.org/images/vincent-van-gogh/the-starry-night-1889.jpg" },
  { id: 2, title: "La joven de la perla", artist: "Johannes Vermeer", year: 1665, category: "Barroco", image: "https://uploads4.wikiart.org/images/johannes-vermeer/girl-with-a-pearl-earring.jpg" },
  { id: 3, title: "Guernica", artist: "Pablo Picasso", year: 1937, category: "Cubismo", image: "https://uploads2.wikiart.org/images/pablo-picasso/guernica-1937.jpg" },
  { id: 4, title: "El nacimiento de Venus", artist: "Sandro Botticelli", year: 1486, category: "Renacimiento", image: "https://uploads8.wikiart.org/images/sandro-botticelli/the-birth-of-venus.jpg" },
  { id: 5, title: "La persistencia de la memoria", artist: "Salvador Dalí", year: 1931, category: "Surrealismo", image: "https://uploads0.wikiart.org/images/salvador-dali/the-persistence-of-memory-1931.jpg" },
  { id: 6, title: "La Gioconda", artist: "Leonardo da Vinci", year: 1503, category: "Renacimiento", image: "https://uploads1.wikiart.org/images/leonardo-da-vinci/mona-lisa.jpg" },
  { id: 7, title: "El grito", artist: "Edvard Munch", year: 1893, category: "Expresionismo", image: "https://uploads0.wikiart.org/images/edvard-munch/the-scream-1893.jpg" },
  { id: 8, title: "Las meninas", artist: "Diego Velázquez", year: 1656, category: "Barroco", image: "https://uploads0.wikiart.org/images/diego-velazquez/las-meninas-1656.jpg" }
];

async function fetchMetArtworks(limit = 32) {
  const res = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11");
  const data = await res.json();

  // Tomamos los primeros 100 objetos para filtrar los que tengan imagen
  const objectIDs = data.objectIDs.slice(0, 100);

  // Traer detalles en paralelo
  const detailPromises = objectIDs.map(id =>
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(r => r.json())
  );

  const details = await Promise.all(detailPromises);

  const artworks = [];
  let nextId = 9;

  for (const d of details) {
    if (artworks.length >= limit) break;
    if (!d.primaryImageSmall) continue;

    artworks.push({
      id: nextId,
      title: d.title || `Obra ${nextId}`,
      artist: d.artistDisplayName || "Desconocido",
      year: d.objectDate || "Desconocido",
      category: d.objectName || "Desconocido",
      image: d.primaryImageSmall
    });

    nextId++;
  }

  return artworks;
}

async function generateArtworks() {
  const metArtworks = await fetchMetArtworks(32);
  const allArtworks = [...famousArtworks, ...metArtworks];

  fs.writeFileSync("./src/data/artworks.json", JSON.stringify(allArtworks, null, 2));

  console.log("✅ artworks.json generado con", allArtworks.length, "obras (famosas + Met Museum)");
}

generateArtworks();
