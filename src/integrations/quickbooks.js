"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectQuickBooks = connectQuickBooks;
exports.fetchQuickBooksData = fetchQuickBooksData;
exports.disconnectQuickBooks = disconnectQuickBooks;
const telemetry_1 = require("../services/telemetry");
async function connectQuickBooks() {
    (0, telemetry_1.trackEvent)("quickbooks_connect_attempt");
    return { status: "connected ✅", company: "Demo Inc", lastSync: new Date().toISOString() };
}
async function fetchQuickBooksData() {
    (0, telemetry_1.trackEvent)("quickbooks_fetch");
    return { invoices: 12, revenue: 56000, expenses: 39000 };
}
async function disconnectQuickBooks() {
    (0, telemetry_1.trackEvent)("quickbooks_disconnect");
    return { status: "disconnected ❌" };
}
