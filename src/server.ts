import express from "express";
import { PrismaClient } from "@prisma/client";
import usersRoute from "./routes/users";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("ICON48 backend API running.");
});

// Get all metrics
app.get("/api/metrics", async (req, res) => {
  try {
    const metrics = await prisma.metric.findMany();
    res.json(metrics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

// Create a test metric
app.post("/api/metrics", async (req, res) => {
  try {
    console.log("Received body:", req.body); // Debug log
    const { name, value, organizationId } = req.body;
    const metric = await prisma.metric.create({
      data: { name, value, organizationId },
    });
    res.json(metric);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create metric" });
  }
});

const PORT = process.env.PORT || 3001;
app.use("/api/users", usersRoute);
app.listen(PORT, () => {
  console.log(`✅ ICON48 API running on port ${PORT}`);
});

// Health check route

// Enhanced Health Check Route (Server + DB)
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', service: 'ICON48 backend live ✅', database: 'connected', time: new Date() });
  } catch (err) {
    res.status(500).json({ status: 'error', service: 'ICON48 backend ⚠️', database: 'unreachable', time: new Date(), error: err instanceof Error ? err.message : String(err) });
  }
});
