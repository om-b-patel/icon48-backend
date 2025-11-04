"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quickbooks_1 = require("../integrations/quickbooks");
const hubspot_1 = require("../integrations/hubspot");
const shopify_1 = require("../integrations/shopify");
const router = (0, express_1.Router)();
router.get("/quickbooks", async (_req, res) => {
    res.json(await (0, quickbooks_1.fetchQuickBooksData)());
});
router.post("/quickbooks/connect", async (_req, res) => {
    res.json(await (0, quickbooks_1.connectQuickBooks)());
});
router.post("/quickbooks/disconnect", async (_req, res) => {
    res.json(await (0, quickbooks_1.disconnectQuickBooks)());
});
router.get("/hubspot", async (_req, res) => {
    res.json(await (0, hubspot_1.fetchHubSpotData)());
});
router.post("/hubspot/connect", async (_req, res) => {
    res.json(await (0, hubspot_1.connectHubSpot)());
});
router.post("/hubspot/disconnect", async (_req, res) => {
    res.json(await (0, hubspot_1.disconnectHubSpot)());
});
router.get("/shopify", async (_req, res) => {
    res.json(await (0, shopify_1.fetchShopifyData)());
});
router.post("/shopify/connect", async (_req, res) => {
    res.json(await (0, shopify_1.connectShopify)());
});
router.post("/shopify/disconnect", async (_req, res) => {
    res.json(await (0, shopify_1.disconnectShopify)());
});
exports.default = router;
