"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectShopify = connectShopify;
exports.fetchShopifyData = fetchShopifyData;
exports.disconnectShopify = disconnectShopify;
const telemetry_1 = require("../services/telemetry");
async function connectShopify() {
    (0, telemetry_1.trackEvent)("shopify_connect_attempt");
    return { status: "connected ✅", shop: "demo-store.myshopify.com", lastSync: new Date().toISOString() };
}
async function fetchShopifyData() {
    (0, telemetry_1.trackEvent)("shopify_fetch");
    return { orders: 27, revenue: 12900, returns: 1 };
}
async function disconnectShopify() {
    (0, telemetry_1.trackEvent)("shopify_disconnect");
    return { status: "disconnected ❌" };
}
