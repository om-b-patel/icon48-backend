import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/users
router.get("/users", async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (err) {
    console.error("Users fetch error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// PUT /api/users/:id (stub)
router.put("/users/:id", async (req, res) => {
  try {
    const { role, name } = req.body;
    
    // TODO: Add real update logic with validation
    res.json({
      message: "User update coming soon",
      userId: req.params.id,
      changes: { role, name }
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

export default router;
