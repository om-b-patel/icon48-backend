"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// -------------------- METRICS --------------------
router.get("/metrics", async (_, res) => {
    try {
        const metrics = await prisma.metric.findMany({ orderBy: { calculatedAt: "desc" } });
        res.json(metrics);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch metrics" });
    }
});
// -------------------- AGENTS --------------------
router.get("/agents", async (_, res) => {
    try {
        const agents = await prisma.agent.findMany({ orderBy: { confidenceScore: "desc" } });
        res.json(agents);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch agents" });
    }
});
// -------------------- WORKFLOWS --------------------
router.get("/workflows", async (_, res) => {
    try {
        const workflows = await prisma.workflow.findMany({ orderBy: { createdAt: "desc" } });
        res.json(workflows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch workflows" });
    }
});
// -------------------- PROFIT GRAPH --------------------
router.get("/profit-graph", async (_, res) => {
    try {
        const nodes = await prisma.profitNode.findMany();
        const edges = await prisma.profitEdge.findMany();
        res.json({ nodes, edges });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch profit graph" });
    }
});
// -------------------- BET LEDGER --------------------
router.get("/bets", async (_, res) => {
    try {
        const bets = await prisma.betLedger.findMany({ orderBy: { createdAt: "desc" } });
        res.json(bets);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch bet ledger" });
    }
});
exports.default = router;
