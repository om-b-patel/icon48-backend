import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// -------------------- HEALTH CHECK --------------------
app.get("/", (req, res) => {
  res.status(200).send("ICON48 backend API running.");
});

app.get("/health", (req, res) => {
  res.status(200).send("ICON48 backend API running.");
});

// -------------------- METRICS --------------------
app.get("/metrics", async (_, res) => {
  try {
    const metrics = await prisma.metric.findMany({ orderBy: { calculatedAt: "desc" } });
    res.json(metrics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

// -------------------- AGENTS --------------------
app.get("/agents", async (_, res) => {
  try {
    const agents = await prisma.agent.findMany({ orderBy: { confidenceScore: "desc" } });
    res.json(agents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch agents" });
  }
});

// -------------------- WORKFLOWS --------------------
app.get("/workflows", async (_, res) => {
  try {
    const workflows = await prisma.workflow.findMany({ orderBy: { createdAt: "desc" } });
    res.json(workflows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch workflows" });
  }
});

// -------------------- PROFIT GRAPH --------------------
app.get("/profit-graph", async (_, res) => {
  try {
    const nodes = await prisma.profitNode.findMany();
    const edges = await prisma.profitEdge.findMany();
    res.json({ nodes, edges });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profit graph" });
  }
});

// -------------------- BET LEDGER --------------------
app.get("/bets", async (_, res) => {
  try {
    const bets = await prisma.betLedger.findMany({ orderBy: { createdAt: "desc" } });
    res.json(bets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bet ledger" });
  }
});

// ✅ Export app (not listen)
export default app;
