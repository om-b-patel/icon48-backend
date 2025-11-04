"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const metrics_1 = __importDefault(require("./routes/metrics"));
const profitGraph_1 = __importDefault(require("./routes/profitGraph"));
const telemetry_1 = require("./services/telemetry");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(telemetry_1.telemetryMiddleware);
// Health check
app.get("/", (req, res) => {
    res.send("✅ ICON48 backend API running.");
});
// API routes
app.use("/api/metrics", metrics_1.default);
app.use("/api/profit-graph", profitGraph_1.default);
// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ ICON48 backend running on port ${PORT}`);
});
