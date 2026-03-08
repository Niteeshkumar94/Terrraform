require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// ── Routes ──────────────────────────────────────────────

// Health check (Railway uses this to verify app is running)
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Home
app.get("/", (req, res) => {
  res.json({
    message: "🚂 Railway App is running!",
    env: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// Sample CRUD-like API
const items = [];

app.get("/items", (req, res) => {
  res.json({ items });
});

app.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  const item = { id: items.length + 1, name, createdAt: new Date().toISOString() };
  items.push(item);
  res.status(201).json(item);
});

app.delete("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Item not found" });
  const deleted = items.splice(index, 1);
  res.json({ deleted: deleted[0] });
});

// ── Start ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on port: ${PORT}`);
  console.log(`🌍 URL: ${process.env.DOMAIN || `http://localhost:${PORT}`}`);
});
