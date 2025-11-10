import { Router } from "express";
import { prisma } from "../prisma";
import { connectQuickBooks, fetchQuickBooksData, disconnectQuickBooks } from "../integrations/quickbooks";
import { connectHubSpot, fetchHubSpotData, disconnectHubSpot } from "../integrations/hubspot";
import { connectShopify, fetchShopifyData, disconnectShopify } from "../integrations/shopify";

const router = Router();

// GET /api/integrations - list all integrations
router.get("/integrations", async (_req, res) => {
  try {
    const integrations = await prisma.integration.findMany();
    res.json(integrations);
  } catch (err) {
    console.error("Integrations fetch error:", err);
    res.status(500).json({ error: "Failed to fetch integrations" });
  }
});

// POST /api/integrations/connect (stub)
router.post("/integrations/connect", async (req, res) => {
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
router.post("/integrations/sync", (_req, res) => {
  res.json({
    status: "queued",
    message: "Manual sync coming soon"
  });
});

router.get("/integrations/quickbooks", async (_req, res) => {
  res.json(await fetchQuickBooksData());
});
router.post("/integrations/quickbooks/connect", async (_req, res) => {
  res.json(await connectQuickBooks());
});
router.post("/integrations/quickbooks/disconnect", async (_req, res) => {
  res.json(await disconnectQuickBooks());
});

router.get("/integrations/hubspot", async (_req, res) => {
  res.json(await fetchHubSpotData());
});
router.post("/integrations/hubspot/connect", async (_req, res) => {
  res.json(await connectHubSpot());
});
router.post("/integrations/hubspot/disconnect", async (_req, res) => {
  res.json(await disconnectHubSpot());
});

router.get("/integrations/shopify", async (_req, res) => {
  res.json(await fetchShopifyData());
});
router.post("/integrations/shopify/connect", async (_req, res) => {
  res.json(await connectShopify());
});
router.post("/integrations/shopify/disconnect", async (_req, res) => {
  res.json(await disconnectShopify());
});

export default router;
