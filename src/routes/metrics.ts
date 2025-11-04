import { Router } from "express";

const router = Router();

// GET /api/metrics
router.get("/", async (_req, res) => {
  res.json({ message: "Metrics endpoint working ✅" });
});

export default router;
