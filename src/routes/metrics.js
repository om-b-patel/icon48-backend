"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /api/metrics
router.get("/", async (_req, res) => {
    res.json({ message: "Metrics endpoint working ✅" });
});
exports.default = router;
