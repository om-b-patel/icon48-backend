import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import metricsRoute from "./routes/metrics";
import profitGraphRoute from "./routes/profitGraph";
import { telemetryMiddleware } from "./services/telemetry";

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use(telemetryMiddleware);

// Health check
app.get("/", (req, res) => {
  res.send("✅ ICON48 backend API running.");
});

// API routes
app.use("/api/metrics", metricsRoute);
app.use("/api/profit-graph", profitGraphRoute);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ ICON48 backend running on port ${PORT}`);
});
