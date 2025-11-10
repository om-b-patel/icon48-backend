import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/metrics
router.get("/", async (_req, res) => {
  try {
    const metrics = await prisma.metric.findMany({
      orderBy: { createdAt: "desc" },
      take: 100
    });
    res.json(metrics);
  } catch (err) {
    console.error("Metrics fetch error:", err);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

// POST /api/metrics
router.post("/", async (req, res) => {
  try {
    const { name, value, workspaceId, workflowId } = req.body;
    
    const metric = await prisma.metric.create({
      data: {
        name,
        value: parseFloat(value) || 0,
        workspaceId: workspaceId || null,
        workflowId: workflowId || null
      }
    });
    
    res.json(metric);
  } catch (err) {
    console.error("Metric creation error:", err);
    res.status(500).json({ error: "Failed to create metric" });
  }
});

export default router;
