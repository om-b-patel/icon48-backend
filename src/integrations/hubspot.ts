import { trackEvent } from "../services/telemetry";

export async function connectHubSpot() {
  trackEvent("hubspot_connect_attempt");
  return { status: "connected ✅", portalId: "1234567", lastSync: new Date().toISOString() };
}

export async function fetchHubSpotData() {
  trackEvent("hubspot_fetch");
  return { contacts: 58, deals: 8, pipelineValue: 48000 };
}

export async function disconnectHubSpot() {
  trackEvent("hubspot_disconnect");
  return { status: "disconnected ❌" };
}
