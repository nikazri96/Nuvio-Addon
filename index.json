const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const manifest = require("./manifest.json");

const app = express();
app.use(cors());

// 1. Route manifest
app.get("/manifest.json", (req, res) => {
  res.json(manifest);
});

// 2. Route stream
app.get("/stream/:type/:id.json", async (req, res) => {
  const { id } = req.params;

  try {
    const targetUrl = `https://vidsrc.to/embed/movie/${id}`;
    const response = await axios.get(targetUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(response.data);
    const iframeSrc = $("iframe").attr("src") || targetUrl;

    res.json({
      streams: [
        {
          name: "PencariMovie",
          title: "Server Auto-Scrape (HD)",
          url: iframeSrc
        }
      ]
    });
  } catch (error) {
    res.json({ streams: [] });
  }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
