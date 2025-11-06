import express from "express";
import cors from "cors";
import { telemetryMiddleware } from "./services/telemetry";
import metricsRoute from "./routes/metrics";
import profitGraphRoute from "./routes/profitGraph";
import integrationsRoute from "./routes/integrations";

const app = express();

app.use(cors());
app.use(express.json());
app.use(telemetryMiddleware);

// health
app.get("/", (_req, res) => {
  res.send("✅ ICON48 backend API running.");
});

app.use("/api/metrics", metricsRoute);
app.use("/api/profit-graph", profitGraphRoute);
app.use("/api/integrations", integrationsRoute);

export default app;
