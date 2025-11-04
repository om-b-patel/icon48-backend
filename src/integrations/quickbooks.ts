import { trackEvent } from "../services/telemetry";

export async function connectQuickBooks() {
  trackEvent("quickbooks_connect_attempt");
  return { status: "connected ✅", company: "Demo Inc", lastSync: new Date().toISOString() };
}

export async function fetchQuickBooksData() {
  trackEvent("quickbooks_fetch");
  return { invoices: 12, revenue: 56000, expenses: 39000 };
}

export async function disconnectQuickBooks() {
  trackEvent("quickbooks_disconnect");
  return { status: "disconnected ❌" };
}
