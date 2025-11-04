import { NextFunction, Request, Response } from "express";
import { PostHog } from "posthog-node";

// Use PostHog only if key exists
const posthog =
  process.env.POSTHOG_API_KEY && process.env.POSTHOG_API_KEY !== ""
    ? new PostHog(process.env.POSTHOG_API_KEY, {
        host: process.env.POSTHOG_HOST || "https://app.posthog.com",
      })
    : null;

// Helper for tracking custom events
export async function trackEvent(event: string, data: Record<string, any> = {}) {
  if (posthog) {
    try {
      await posthog.capture({
        distinctId: data.userId || "system",
        event,
        properties: data,
      });
    } catch (err) {
      console.error("[Telemetry] Failed to send event:", err);
    }
  } else {
    console.log(`[Telemetry] ${event}`, data);
  }
}

// Express middleware to log every API request
export function telemetryMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    trackEvent("api_request", {
      path: req.path,
      method: req.method,
      status: res.statusCode,
      duration,
    });
  });
  next();
}

// Flush queued PostHog events gracefully on shutdown
process.on("SIGINT", async () => {
  if (posthog) {
    await posthog.shutdown();
  }
  process.exit(0);
});
