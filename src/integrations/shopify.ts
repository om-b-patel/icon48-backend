import { trackEvent } from "../services/telemetry";

export async function connectShopify() {
  trackEvent("shopify_connect_attempt");
  return { status: "connected ✅", shop: "demo-store.myshopify.com", lastSync: new Date().toISOString() };
}

export async function fetchShopifyData() {
  trackEvent("shopify_fetch");
  return { orders: 27, revenue: 12900, returns: 1 };
}

export async function disconnectShopify() {
  trackEvent("shopify_disconnect");
  return { status: "disconnected ❌" };
}
