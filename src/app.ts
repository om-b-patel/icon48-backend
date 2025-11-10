import express from "express";
import cors from "cors";
import { telemetryMiddleware } from "./services/telemetry";

// Import all route modules
import systemRoute from "./routes/system";
import authRoute from "./routes/auth";
import usersRoute from "./routes/users";
import metricsRoute from "./routes/metrics";
import financeRoute from "./routes/finance";
import agentsRoute from "./routes/agents";
import workflowsRoute from "./routes/workflows";
import profitGraphRoute from "./routes/profitGraph";
import betsRoute from "./routes/bets";
import integrationsRoute from "./routes/integrations";
import marketingRoute from "./routes/marketing";
import supportRoute from "./routes/support";
import operationsRoute from "./routes/operations";
import complianceRoute from "./routes/compliance";
import inventoryRoute from "./routes/inventory";
import adminRoute from "./routes/admin";

const app = express();

app.use(cors());
app.use(express.json());
app.use(telemetryMiddleware);

// Root health check
app.get("/", (_req, res) => {
  res.send("✅ ICON48 backend API running.");
});

// Mount all API routes
app.use("/api", systemRoute);           // /api/health, /api/status, /api/config, /api/telemetry, /api/logs
app.use("/api", authRoute);             // /api/auth/*
app.use("/api", usersRoute);            // /api/users
app.use("/api/metrics", metricsRoute);  // /api/metrics
app.use("/api", financeRoute);          // /api/finance/*
app.use("/api", agentsRoute);           // /api/agents
app.use("/api", workflowsRoute);        // /api/workflows
app.use("/api/profit-graph", profitGraphRoute); // /api/profit-graph
app.use("/api", betsRoute);             // /api/bets
app.use("/api/integrations", integrationsRoute); // /api/integrations
app.use("/api", marketingRoute);        // /api/marketing, /api/audience
app.use("/api", supportRoute);          // /api/support/*
app.use("/api", operationsRoute);       // /api/operations
app.use("/api", complianceRoute);       // /api/compliance/*
app.use("/api", inventoryRoute);        // /api/inventory
app.use("/api", adminRoute);            // /api/admin/*

export default app;
