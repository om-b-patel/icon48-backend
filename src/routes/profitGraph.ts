import { Router } from "express";
import { getProfitGraphSnapshot } from "../services/profitGraph";

const router = Router();

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

export default router;
