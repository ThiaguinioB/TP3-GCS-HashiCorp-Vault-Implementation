import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const VERSION = (process.env.VERSION || "v1").toLowerCase(); // "v1" | "v2"

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/version", (_req, res) => {
  res.json({ version: VERSION });
});

// fallback para SPA / archivos estáticos
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Version Color App (${VERSION}) escuchando en ${PORT}`);
});
