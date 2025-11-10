import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/workflows
router.get("/workflows", async (_req, res) => {
  try {
    const workflows = await prisma.workflow.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        runs: {
          take: 5,
          orderBy: { startedAt: "desc" }
        }
      }
    });
    res.json(workflows);
  } catch (err) {
    console.error("Workflows fetch error:", err);
    res.status(500).json({ error: "Failed to fetch workflows" });
  }
});

// POST /api/workflows
router.post("/workflows", async (req, res) => {
  try {
    const { name, description, workspaceId } = req.body;
    
    if (!workspaceId) {
      return res.status(400).json({ error: "workspaceId is required" });
    }
    
    const workflow = await prisma.workflow.create({
      data: {
        name,
        description: description || "",
        workspaceId,
        status: "idle"
      }
    });
    
    res.json(workflow);
  } catch (err) {
    console.error("Workflow creation error:", err);
    res.status(500).json({ error: "Failed to create workflow" });
  }
});

// PUT /api/workflows/:id
router.put("/workflows/:id", async (req, res) => {
  try {
    const { name, description, status, active } = req.body;
    
    const workflow = await prisma.workflow.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
        ...(active !== undefined && { active })
      }
    });
    
    res.json(workflow);
  } catch (err) {
    console.error("Workflow update error:", err);
    res.status(500).json({ error: "Failed to update workflow" });
  }
});

// DELETE /api/workflows/:id (stub)
router.delete("/workflows/:id", (_req, res) => {
  res.json({
    message: "Workflow deletion coming soon"
  });
});

// POST /api/workflows/:id/run (stub)
router.post("/workflows/:id/run", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Create a workflow run
    const run = await prisma.workflowRun.create({
      data: {
        workflowId: id,
        status: "queued",
        startedAt: new Date()
      }
    });
    
    res.json({
      status: "queued",
      runId: run.id,
      message: "Workflow execution will integrate with n8n/Make later"
    });
  } catch (err) {
    console.error("Workflow run error:", err);
    res.status(500).json({ error: "Failed to start workflow" });
  }
});

// GET /api/workflows/history
router.get("/workflows/history", async (_req, res) => {
  try {
    const runs = await prisma.workflowRun.findMany({
      orderBy: { startedAt: "desc" },
      take: 50,
      include: {
        workflow: {
          select: { name: true, id: true }
        }
      }
    });
    res.json(runs);
  } catch (err) {
    console.error("Workflow history error:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;

