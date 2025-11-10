import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// --- Serverless-safe Prisma initialization ---
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"],
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// --- Health check route ---
app.get("/api/health", async (_, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch (err: any) {
    console.error("Health check failed:", err);
    res.status(500).json({
      status: "error",
      db: "disconnected",
      message: err.message,
    });
  }
});

// --- Base route ---
app.get("/", (_, res) => {
  res.send("ICON48 backend API running.");
});

// --- Import and mount all route modules ---
import systemRoutes from "./routes/system";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import metricsRoutes from "./routes/metrics";
import financeRoutes from "./routes/finance";
import agentsRoutes from "./routes/agents";
import workflowsRoutes from "./routes/workflows";
import profitGraphRoutes from "./routes/profitGraph";
import betsRoutes from "./routes/bets";
import integrationsRoutes from "./routes/integrations";
import marketingRoutes from "./routes/marketing";
import supportRoutes from "./routes/support";
import operationsRoutes from "./routes/operations";
import complianceRoutes from "./routes/compliance";
import inventoryRoutes from "./routes/inventory";
import adminRoutes from "./routes/admin";

// Mount all API routes at /api prefix
app.use("/api", systemRoutes);
app.use("/api", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", metricsRoutes);
app.use("/api", financeRoutes);
app.use("/api", agentsRoutes);
app.use("/api", workflowsRoutes);
app.use("/api", profitGraphRoutes);
app.use("/api", betsRoutes);
app.use("/api", integrationsRoutes);
app.use("/api", marketingRoutes);
app.use("/api", supportRoutes);
app.use("/api", operationsRoutes);
app.use("/api", complianceRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", adminRoutes);

// --- Local listener (only in dev) ---
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Local dev server running on port ${PORT}`));
}

// --- Export for Vercel serverless ---
export default app;
