import { Router } from "express";

const router = Router();

// GET /api/support/tickets (stub)
router.get("/support/tickets", (_req, res) => {
  res.json({
    message: "Support tickets coming soon",
    tickets: []
  });
});

// POST /api/support/tickets (stub)
router.post("/support/tickets", (_req, res) => {
  res.json({
    message: "Ticket creation coming soon"
  });
});

// GET /api/support/sentiment (stub)
router.get("/support/sentiment", (_req, res) => {
  res.json({
    message: "Sentiment analysis coming soon",
    sentiment: { score: 0, trend: "neutral" }
  });
});

export default router;

