"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profitGraph_1 = require("../services/profitGraph");
const router = (0, express_1.Router)();
// GET /api/profit-graph/snapshot
router.get("/snapshot", async (_req, res) => {
    try {
        const snapshot = await (0, profitGraph_1.getProfitGraphSnapshot)();
        res.json(snapshot);
    }
    catch (err) {
        console.error("Error building profit graph snapshot:", err);
        res.status(500).json({ error: "Failed to build profit graph snapshot" });
    }
});
exports.default = router;
