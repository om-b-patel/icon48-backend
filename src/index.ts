import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { telemetryMiddleware } from "./services/telemetry";

// Import all route modules
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

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use(telemetryMiddleware);

// Root health check
app.get("/", (_, res) => {
  res.send("✅ ICON48 backend API running.");
});

// Explicit health endpoint for Vercel
app.get("/api/health", (_, res) => {
  res.json({ status: "ok" });
});

// Mount all API routes at /api prefix
// Routes define their own sub-paths (e.g., /health, /status, /users, etc.)
app.use("/api", systemRoutes);      // /api/health, /api/status, /api/config, etc.
app.use("/api", authRoutes);        // /api/auth/login, /api/auth/register, etc.
app.use("/api", usersRoutes);       // /api/users, /api/users/:id
app.use("/api", metricsRoutes);     // /api/metrics
app.use("/api", financeRoutes);     // /api/finance/summary, /api/finance/forecast, etc.
app.use("/api", agentsRoutes);      // /api/agents, /api/agents/:id, etc.
app.use("/api", workflowsRoutes);   // /api/workflows, /api/workflows/:id/run, etc.
app.use("/api", profitGraphRoutes); // /api/profit-graph, /api/profit-graph/snapshot, etc.
app.use("/api", betsRoutes);        // /api/bets, /api/bets/stats, etc.
app.use("/api", integrationsRoutes); // /api/integrations, /api/integrations/connect, etc.
app.use("/api", marketingRoutes);   // /api/marketing/campaigns, /api/audience, etc.
app.use("/api", supportRoutes);     // /api/support/tickets, /api/support/sentiment, etc.
app.use("/api", operationsRoutes);  // /api/operations, /api/operations/bottlenecks
app.use("/api", complianceRoutes);  // /api/compliance/audit, /api/compliance/policies
app.use("/api", inventoryRoutes);   // /api/inventory, /api/inventory/alerts
app.use("/api", adminRoutes);       // /api/admin/seed, /api/admin/reset, etc.

// Local-only listener (Vercel handles this in production)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ ICON48 backend API running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
