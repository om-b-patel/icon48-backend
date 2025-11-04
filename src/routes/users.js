"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await prisma.Metric.findMany();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
// Create a new user
router.post("/", async (req, res) => {
    try {
        const { email, name } = req.body;
        const newUser = await prisma.Metric.create({
            data: { email, name },
        });
        res.json(newUser);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create user" });
    }
});
exports.default = router;
