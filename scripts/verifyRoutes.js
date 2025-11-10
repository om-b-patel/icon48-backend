const axios = require('axios');

const baseURL = "http://localhost:3000/api";

// Define routes with their methods
const routes = [
  { path: "health", method: "GET" },
  { path: "status", method: "GET" },
  { path: "auth/login", method: "POST", data: { email: "test@test.com", password: "test" } },
  { path: "users", method: "GET" },
  { path: "metrics", method: "GET" },
  { path: "finance/summary", method: "GET" },
  { path: "agents", method: "GET" },
  { path: "workflows", method: "GET" },
  { path: "profit-graph", method: "GET" },
  { path: "bets", method: "GET" },
  { path: "integrations", method: "GET" },
  { path: "marketing/campaigns", method: "GET" },
  { path: "support/tickets", method: "GET" },
  { path: "operations", method: "GET" },
  { path: "compliance/audit", method: "GET" },
  { path: "inventory", method: "GET" },
  { path: "admin/seed", method: "POST" }
];

(async () => {
  console.log("\n🔍 ICON48 Backend Route Verification\n");
  console.log("=" .repeat(50));
  
  let passed = 0;
  let failed = 0;
  
  for (const route of routes) {
    try {
      const url = `${baseURL}/${route.path}`;
      let res;
      
      if (route.method === "POST") {
        res = await axios.post(url, route.data || {}, { timeout: 5000 });
      } else {
        res = await axios.get(url, { timeout: 5000 });
      }
      
      console.log(`✅ ${route.path.padEnd(25)} → ${res.status} OK (${route.method})`);
      passed++;
    } catch (err) {
      const status = err.response?.status || 'TIMEOUT';
      const message = err.response?.data?.error || err.message;
      console.log(`❌ ${route.path.padEnd(25)} → ${status} FAILED (${message})`);
      failed++;
    }
  }
  
  console.log("=" .repeat(50));
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${routes.length} routes`);
  console.log(`\n${failed === 0 ? '🎉 All routes working!' : '⚠️  Some routes need attention'}\n`);
  
  process.exit(failed > 0 ? 1 : 0);
})();

