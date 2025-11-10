import { Router } from "express";
import { prisma } from "../index";

const router = Router();

// GET /api/finance/summary
router.get("/finance/summary", async (_req, res) => {
  try {
    // Compute rollup from metrics
    const metrics = await prisma.metric.findMany();
    
    const revenue = metrics
      .filter(m => m.name.toLowerCase().includes("revenue"))
      .reduce((sum, m) => sum + m.value, 0);
    
    const cost = metrics
      .filter(m => m.name.toLowerCase().includes("cost"))
      .reduce((sum, m) => sum + (m.costUsd || 0), 0);
    
    const profit = revenue - cost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    
    res.json({
      revenue,
      cost,
      profit,
      margin: parseFloat(margin.toFixed(2)),
      lastUpdated: new Date()
    });
  } catch (err) {
    console.error("Finance summary error:", err);
    res.json({
      revenue: 0,
      cost: 0,
      profit: 0,
      margin: 0,
      lastUpdated: new Date()
    });
  }
});

// GET /api/finance/forecast (stub)
router.get("/finance/forecast", (_req, res) => {
  res.json({
    message: "AI forecast coming soon",
    forecast: [
      { month: "Jan", predicted: 0 },
      { month: "Feb", predicted: 0 },
      { month: "Mar", predicted: 0 }
    ]
  });
});

// GET /api/finance/insights (stub)
router.get("/finance/insights", (_req, res) => {
  res.json({
    message: "AI insights coming soon",
    insights: []
  });
});

// GET /api/finance/ledger (stub)
router.get("/finance/ledger", (_req, res) => {
  res.json({
    message: "Finance ledger coming soon",
    entries: []
  });
});

export default router;

