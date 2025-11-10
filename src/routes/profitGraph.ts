import { Router } from "express";
import { getProfitGraphSnapshot } from "../services/profitGraph";

const router = Router();

// GET /api/profit-graph
router.get("/", async (_req, res) => {
  try {
    const snapshot = await getProfitGraphSnapshot();
    res.json(snapshot);
  } catch (err) {
    console.error("Error building profit graph snapshot:", err);
    res.status(500).json({ error: "Failed to build profit graph snapshot" });
  }
});

// GET /api/profit-graph/snapshot
router.get("/snapshot", async (_req, res) => {
  try {
    const snapshot = await getProfitGraphSnapshot();
    res.json(snapshot);
  } catch (err) {
    console.error("Error building profit graph snapshot:", err);
    res.status(500).json({ error: "Failed to build profit graph snapshot" });
  }
});

// POST /api/profit-graph/rebuild (stub)
router.post("/rebuild", (_req, res) => {
  res.json({
    message: "Graph rebuild coming soon",
    status: "queued"
  });
});

// GET /api/profit-graph/snapshots (stub)
router.get("/snapshots", (_req, res) => {
  res.json({
    message: "Saved snapshots coming soon",
    snapshots: []
  });
});

// POST /api/profit-graph/snapshots (stub)
router.post("/snapshots", (_req, res) => {
  res.json({
    message: "Snapshot save coming soon",
    id: `snapshot_${Date.now()}`
  });
});

export default router;
