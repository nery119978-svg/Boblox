const express = require("express");
const compression = require("compression");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const GAME_FILE = path.join(__dirname, "Bloxworld.html");

if (!fs.existsSync(GAME_FILE)) {
  console.error("❌ No encuentro Bloxworld.html junto a server.js");
  process.exit(1);
}

// El HTML pesa ~12 MB, así que lo comprimimos con gzip
app.use(compression());

app.get("/health", (_req, res) => res.send("ok"));

app.get("/", (_req, res) => {
  res.sendFile(GAME_FILE, { maxAge: "1h" });
});

app.use(express.static(__dirname, { index: false, dotfiles: "ignore" }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🎮 Bloxworld corriendo en http://localhost:${PORT}`);
});
