import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/agents
router.get("/agents", async (_req, res) => {
  try {
    const agents = await prisma.agent.findMany({
      orderBy: { confidenceScore: "desc" }
    });
    res.json(agents);
  } catch (err) {
    console.error("Agents fetch error:", err);
    res.status(500).json({ error: "Failed to fetch agents" });
  }
});

// POST /api/agents (stub)
router.post("/agents", async (req, res) => {
  try {
    const { name, type, description } = req.body;
    
    // TODO: Create agent properly with workspace context
    res.json({
      message: "Agent creation coming soon",
      agent: { name, type, description }
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create agent" });
  }
});

// GET /api/agents/:id
router.get("/agents/:id", async (req, res) => {
  try {
    const agent = await prisma.agent.findUnique({
      where: { id: req.params.id },
      include: { tasks: true }
    });
    
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }
    
    res.json(agent);
  } catch (err) {
    console.error("Agent fetch error:", err);
    res.status(500).json({ error: "Failed to fetch agent" });
  }
});

// POST /api/agents/train (stub)
router.post("/agents/train", (_req, res) => {
  res.json({
    status: "training-started",
    message: "Agent training coming soon"
  });
});

// POST /api/agents/evaluate (stub)
router.post("/agents/evaluate", (_req, res) => {
  res.json({
    status: "evaluation-queued",
    message: "Agent evaluation coming soon"
  });
});

// GET /api/agents/summary
router.get("/agents/summary", async (_req, res) => {
  try {
    const totalAgents = await prisma.agent.count();
    const activeAgents = await prisma.agent.count({
      where: { active: true }
    });
    
    const avgConfidence = await prisma.agent.aggregate({
      _avg: { confidenceScore: true }
    });
    
    res.json({
      total: totalAgents,
      active: activeAgents,
      avgConfidence: avgConfidence._avg.confidenceScore || 0
    });
  } catch (err) {
    res.json({
      total: 0,
      active: 0,
      avgConfidence: 0
    });
  }
});

export default router;

