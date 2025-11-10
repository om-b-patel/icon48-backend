import { Router } from "express";
import { prisma } from "../index";

const router = Router();

// POST /api/admin/seed
router.post("/admin/seed", async (_req, res) => {
  try {
    // Create demo workspace
    const workspace = await prisma.workspace.create({
      data: {
        name: "Demo Workspace",
        plan: "pro"
      }
    });
    
    // Create demo agents
    await prisma.agent.createMany({
      data: [
        {
          name: "Revenue Optimizer",
          type: "optimizer",
          description: "Optimizes pricing and revenue streams",
          confidenceScore: 0.85,
          workspaceId: workspace.id
        },
        {
          name: "Cost Analyzer",
          type: "analyzer",
          description: "Analyzes and reduces operational costs",
          confidenceScore: 0.92,
          workspaceId: workspace.id
        }
      ]
    });
    
    // Create demo metrics
    await prisma.metric.createMany({
      data: [
        { name: "Monthly Revenue", value: 50000, workspaceId: workspace.id },
        { name: "Operating Cost", value: 30000, workspaceId: workspace.id },
        { name: "Customer Acquisition Cost", value: 150, workspaceId: workspace.id }
      ]
    });
    
    res.json({
      success: true,
      message: "Demo data created",
      workspaceId: workspace.id
    });
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({ error: "Failed to seed data" });
  }
});

// POST /api/admin/reset (stub)
router.post("/admin/reset", (_req, res) => {
  res.json({
    message: "Cache reset coming soon"
  });
});

// GET /api/admin/deploy (stub)
router.get("/admin/deploy", (_req, res) => {
  res.json({
    message: "Deploy info coming soon",
    environment: process.env.NODE_ENV || "development"
  });
});

export default router;

