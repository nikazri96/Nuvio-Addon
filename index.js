const express = require("express");
const cors = require("cors");
const manifest = require("./manifest.json");

const app = express();
app.use(cors());

// Route untuk manifest Nuvio
app.get("/manifest.json", (req, res) => {
  res.json(manifest);
});

// Route untuk stream movie & series
app.get("/stream/:type/:id.json", (req, res) => {
  let { id } = req.params;

  // Buang sambungan .json jika ada pada ID IMDB (Contoh: tt0816692.json -> tt0816692)
  const cleanId = id.replace(".json", "");

  // Hantar senarai stream video ke Nuvio
  res.json({
    streams: [
      {
        name: "PencariMovie",
        title: "VidSrc Stream Server 1 (HD)",
        url: `https://vidsrc.to/embed/movie/${cleanId}`
      },
      {
        name: "PencariMovie",
        title: "VidSrc Stream Server 2 (Fast)",
        url: `https://vidsrc.me/embed/movie?imdb=${cleanId}`
      }
    ]
  });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server PencariMovie berjalan di port ${PORT}`);
});

