import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { connectQuickBooks, fetchQuickBooksData, disconnectQuickBooks } from "../integrations/quickbooks";
import { connectHubSpot, fetchHubSpotData, disconnectHubSpot } from "../integrations/hubspot";
import { connectShopify, fetchShopifyData, disconnectShopify } from "../integrations/shopify";

const router = Router();
const prisma = new PrismaClient();

// GET /api/integrations - list all integrations
router.get("/", async (_req, res) => {
  try {
    const integrations = await prisma.integration.findMany();
    res.json(integrations);
  } catch (err) {
    console.error("Integrations fetch error:", err);
    res.status(500).json({ error: "Failed to fetch integrations" });
  }
});

// POST /api/integrations/connect (stub)
router.post("/connect", async (req, res) => {
  try {
    const { type, credentials } = req.body;
    
    // TODO: Actually connect to the service
    const integration = await prisma.integration.create({
      data: {
        type,
        status: "connected",
        configJson: credentials || {}
      }
    });
    
    res.json({
      success: true,
      integration,
      message: "Integration connection will be implemented with n8n/Make"
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to connect integration" });
  }
});

// POST /api/integrations/sync (stub)
router.post("/sync", (_req, res) => {
  res.json({
    status: "queued",
    message: "Manual sync coming soon"
  });
});

router.get("/quickbooks", async (_req, res) => {
  res.json(await fetchQuickBooksData());
});
router.post("/quickbooks/connect", async (_req, res) => {
  res.json(await connectQuickBooks());
});
router.post("/quickbooks/disconnect", async (_req, res) => {
  res.json(await disconnectQuickBooks());
});

router.get("/hubspot", async (_req, res) => {
  res.json(await fetchHubSpotData());
});
router.post("/hubspot/connect", async (_req, res) => {
  res.json(await connectHubSpot());
});
router.post("/hubspot/disconnect", async (_req, res) => {
  res.json(await disconnectHubSpot());
});

router.get("/shopify", async (_req, res) => {
  res.json(await fetchShopifyData());
});
router.post("/shopify/connect", async (_req, res) => {
  res.json(await connectShopify());
});
router.post("/shopify/disconnect", async (_req, res) => {
  res.json(await disconnectShopify());
});

export default router;
