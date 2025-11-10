import { Router } from "express";

const router = Router();

// GET /api/operations (stub)
router.get("/operations", (_req, res) => {
  res.json({
    message: "Operations data coming soon",
    operations: []
  });
});

// GET /api/operations/bottlenecks (stub)
router.get("/operations/bottlenecks", (_req, res) => {
  res.json({
    message: "Bottleneck detection coming soon",
    bottlenecks: []
  });
});

export default router;

