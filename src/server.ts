import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// ✅ Health check route
app.get("/health", async (req, res) => {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      service: "ICON48 backend live ✅",
      database: "connected",
      responseMs: Date.now() - start,
      time: new Date(),
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      service: "ICON48 backend ❌",
      database: "unreachable",
      error: err instanceof Error ? err.message : String(err),
      time: new Date(),
    });
  }
});

// ✅ Metrics route
app.get("/api/metrics", async (req, res) => {
  try {
    const metrics = await prisma.metric.findMany();
    res.json(metrics);
  } catch (err) {
    console.error("Error fetching metrics:", err);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("ICON48 backend API running.");
});

// ✅ Start server
app.listen(3000, () => {
  console.log("🚀 ICON48 backend running on port 3000");
});
