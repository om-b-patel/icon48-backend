import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Enhanced Health Check Route (Server + DB latency)
app.get("/health", async (req, res) => {
  const start = Date.now();
  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - dbStart;

    res.json({
      status: "ok",
      service: "ICON48 backend live ✅",
      database: {
        status: "connected",
        latencyMs: dbLatency,
      },
      responseTimeMs: Date.now() - start,
      time: new Date(),
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      service: "ICON48 backend ⚠️",
      database: {
        status: "unreachable",
        latencyMs: null,
      },
      responseTimeMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
      time: new Date(),
    });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("ICON48 backend API running.");
});

// Start server
app.listen(3000, () => {
  console.log("🚀 ICON48 backend running on port 3000");
});
