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

  // Buang sambungan .json jika ada pada ID IMDB
  const cleanId = id.replace(".json", "");

  // Menghantar pelbagai pilihan server alternatif yang pantas
  res.json({
    streams: [
      {
        name: "PencariMovie",
        title: "⚡ AutoEmbed (Pantas)",
        url: `https://player.autoembed.cc/embed/movie/${cleanId}`
      },
      {
        name: "PencariMovie",
        title: "⚡ SmashyStream (Laju)",
        url: `https://embed.smashystream.com/playere.php?imdb=${cleanId}`
      },
      {
        name: "PencariMovie",
        title: "⚡ 2Embed (Stabil)",
        url: `https://www.2embed.cc/embed/${cleanId}`
      },
      {
        name: "PencariMovie",
        title: "🐢 VidSrc Server 1",
        url: `https://vidsrc.to/embed/movie/${cleanId}`
      },
      {
        name: "PencariMovie",
        title: "🐢 VidSrc Server 2",
        url: `https://vidsrc.me/embed/movie?imdb=${cleanId}`
      }
    ]
  });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server PencariMovie berjalan di port ${PORT}`);
});


