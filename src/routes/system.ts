import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET /api/health
router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// GET /api/status
router.get("/status", async (_req, res) => {
  try {
    const agentCount = await prisma.agent.count();
    const uptime = process.uptime();
    
    res.json({
      uptime: Math.floor(uptime),
      db: "ok",
      agents: agentCount
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch status" });
  }
});

// GET /api/config (stub)
router.get("/config", (_req, res) => {
  res.json({
    message: "Coming soon",
    config: {
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development"
    }
  });
});

// PUT /api/config (stub)
router.put("/config", (_req, res) => {
  res.json({ message: "Config update coming soon" });
});

// POST /api/telemetry
router.post("/telemetry", async (req, res) => {
  try {
    const { event, payload } = req.body;
    
    // Store in database
    await prisma.telemetryEvent.create({
      data: {
        event,
        payload: payload || {}
      }
    });
    
    console.log(`[Telemetry] ${event}`, payload);
    res.json({ success: true });
  } catch (err) {
    console.error("Telemetry error:", err);
    res.status(500).json({ error: "Failed to store telemetry" });
  }
});

// GET /api/logs (stub)
router.get("/logs", (_req, res) => {
  res.json({
    message: "Log aggregation coming soon",
    logs: []
  });
});

export default router;

