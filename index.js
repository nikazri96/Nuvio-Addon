const express = require("express");
const cors = require("cors");
const manifest = require("./manifest.json");

const app = express();
app.use(cors());

// Route untuk manifest
app.get("/manifest.json", (req, res) => {
  res.json(manifest);
});

// Route untuk stream movie
app.get("/stream/:type/:id.json", (req, res) => {
  const { id } = req.params;

  res.json({
    streams: [
      {
        name: "PencariMovie",
        title: "VidSrc Stream Server (HD)",
        url: `https://vidsrc.to/embed/movie/${id}`
      }
    ]
  });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server aktif di port ${PORT}`);
});
