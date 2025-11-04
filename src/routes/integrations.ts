import { Router } from "express";
import { connectQuickBooks, fetchQuickBooksData, disconnectQuickBooks } from "../integrations/quickbooks";
import { connectHubSpot, fetchHubSpotData, disconnectHubSpot } from "../integrations/hubspot";
import { connectShopify, fetchShopifyData, disconnectShopify } from "../integrations/shopify";

const router = Router();

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
