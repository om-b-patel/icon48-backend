import { Router } from "express";

const router = Router();

// GET /api/inventory (stub)
router.get("/inventory", (_req, res) => {
  res.json({
    message: "Inventory data coming soon",
    inventory: []
  });
});

// GET /api/inventory/alerts (stub)
router.get("/inventory/alerts", (_req, res) => {
  res.json({
    message: "Inventory alerts coming soon",
    alerts: []
  });
});

export default router;

