import { Router } from "express";
import { prisma } from "../index";

const router = Router();

// GET /api/bets
router.get("/bets", async (_req, res) => {
  try {
    const bets = await prisma.betLedger.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(bets);
  } catch (err) {
    console.error("Bets fetch error:", err);
    res.status(500).json({ error: "Failed to fetch bets" });
  }
});

// POST /api/bets
router.post("/bets", async (req, res) => {
  try {
    const { name, description, status } = req.body;
    
    const bet = await prisma.betLedger.create({
      data: {
        name,
        description: description || null,
        status: status || "pending"
      }
    });
    
    res.json(bet);
  } catch (err) {
    console.error("Bet creation error:", err);
    res.status(500).json({ error: "Failed to create bet" });
  }
});

// GET /api/bets/stats
router.get("/bets/stats", async (_req, res) => {
  try {
    const total = await prisma.betLedger.count();
    const won = await prisma.betLedger.count({ where: { status: "won" } });
    const lost = await prisma.betLedger.count({ where: { status: "lost" } });
    const pending = await prisma.betLedger.count({ where: { status: "pending" } });
    
    const successRate = total > 0 ? (won / total) * 100 : 0;
    
    res.json({
      total,
      won,
      lost,
      pending,
      successRate: parseFloat(successRate.toFixed(2))
    });
  } catch (err) {
    res.json({
      total: 0,
      won: 0,
      lost: 0,
      pending: 0,
      successRate: 0
    });
  }
});

// POST /api/bets/evaluate (stub)
router.post("/bets/evaluate", (_req, res) => {
  res.json({
    message: "AI bet evaluation coming soon",
    status: "queued"
  });
});

export default router;

