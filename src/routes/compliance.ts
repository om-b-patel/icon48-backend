import { Router } from "express";

const router = Router();

// GET /api/compliance/audit (stub)
router.get("/compliance/audit", (_req, res) => {
  res.json({
    message: "Audit logs coming soon",
    logs: []
  });
});

// GET /api/compliance/policies (stub)
router.get("/compliance/policies", (_req, res) => {
  res.json({
    message: "Compliance policies coming soon",
    policies: []
  });
});

export default router;

