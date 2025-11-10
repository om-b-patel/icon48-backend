import { Router } from "express";
import { getProfitGraphSnapshot } from "../services/profitGraph";

const router = Router();

// GET /api/profit-graph
router.get("/profit-graph", async (_req, res) => {
  try {
    const snapshot = await getProfitGraphSnapshot();
    res.json(snapshot);
  } catch (err) {
    console.error("Error building profit graph snapshot:", err);
    res.status(500).json({ error: "Failed to build profit graph snapshot" });
  }
});

// GET /api/profit-graph/snapshot
router.get("/profit-graph/snapshot", async (_req, res) => {
  try {
    const snapshot = await getProfitGraphSnapshot();
    res.json(snapshot);
  } catch (err) {
    console.error("Error building profit graph snapshot:", err);
    res.status(500).json({ error: "Failed to build profit graph snapshot" });
  }
});

// POST /api/profit-graph/rebuild (stub)
router.post("/profit-graph/rebuild", (_req, res) => {
  res.json({
    message: "Graph rebuild coming soon",
    status: "queued"
  });
});

// GET /api/profit-graph/snapshots (stub)
router.get("/profit-graph/snapshots", (_req, res) => {
  res.json({
    message: "Saved snapshots coming soon",
    snapshots: []
  });
});

// POST /api/profit-graph/snapshots (stub)
router.post("/profit-graph/snapshots", (_req, res) => {
  res.json({
    message: "Snapshot save coming soon",
    id: `snapshot_${Date.now()}`
  });
});

export default router;
