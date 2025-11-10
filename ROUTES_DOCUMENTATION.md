# ICON48 Backend Routes Documentation

## Overview
Complete API routes for the ICON48 backend system. All routes are prefixed with `/api`.

---

## 1. System Core (`/routes/system.ts`)
**Purpose**: System health, config, and telemetry

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/health` | GET | ✅ Real | Health check - returns `{ status: "ok" }` |
| `/api/status` | GET | ✅ Real | System status with uptime, db status, agent count |
| `/api/config` | GET | 🟡 Stub | System configuration |
| `/api/config` | PUT | 🟡 Stub | Update configuration |
| `/api/telemetry` | POST | ✅ Real | Store telemetry events to `TelemetryEvent` table |
| `/api/logs` | GET | 🟡 Stub | Application logs (future: PostHog/Vercel) |

---

## 2. Authentication & Users (`/routes/auth.ts`, `/routes/users.ts`)

### Auth Routes
| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/auth/register` | POST | 🟡 Stub | User registration (returns fake user) |
| `/api/auth/login` | POST | 🟡 Stub | User login (returns dev token) |
| `/api/auth/logout` | POST | 🟡 Stub | User logout |

### User Routes
| Endpoint | Method | Status | Description | Prisma Table |
|----------|--------|--------|-------------|--------------|
| `/api/users` | GET | ✅ Real | List all users | `User` |
| `/api/users/:id` | PUT | 🟡 Stub | Update user role/status | `User` |

---

## 3. Metrics & Finance (`/routes/metrics.ts`, `/routes/finance.ts`)

### Metrics Routes
| Endpoint | Method | Status | Description | Prisma Table |
|----------|--------|--------|-------------|--------------|
| `/api/metrics` | GET | ✅ Real | List all metrics | `Metric` |
| `/api/metrics` | POST | ✅ Real | Create new metric | `Metric` |

### Finance Routes
| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/finance/summary` | GET | ✅ Real | Revenue, cost, profit, margin computed from metrics |
| `/api/finance/forecast` | GET | 🟡 Stub | AI-generated forecast |
| `/api/finance/insights` | GET | 🟡 Stub | AI insights |
| `/api/finance/ledger` | GET | 🟡 Stub | Finance ledger |

---

## 4. Agents (`/routes/agents.ts`)
**Purpose**: 8-core agent system management

| Endpoint | Method | Status | Description | Prisma Table |
|----------|--------|--------|-------------|--------------|
| `/api/agents` | GET | ✅ Real | List all agents | `Agent` |
| `/api/agents` | POST | 🟡 Stub | Create new agent | `Agent` |
| `/api/agents/:id` | GET | ✅ Real | Get single agent with tasks | `Agent` + `AgentTask` |
| `/api/agents/train` | POST | 🟡 Stub | Train agent | - |
| `/api/agents/evaluate` | POST | 🟡 Stub | Evaluate agent | - |
| `/api/agents/summary` | GET | ✅ Real | Agent health summary | `Agent` |

---

## 5. Workflows & Automation (`/routes/workflows.ts`)

| Endpoint | Method | Status | Description | Prisma Table |
|----------|--------|--------|-------------|--------------|
| `/api/workflows` | GET | ✅ Real | List all workflows | `Workflow` |
| `/api/workflows` | POST | ✅ Real | Create workflow | `Workflow` |
| `/api/workflows/:id` | PUT | ✅ Real | Update workflow | `Workflow` |
| `/api/workflows/:id` | DELETE | 🟡 Stub | Delete workflow | `Workflow` |
| `/api/workflows/:id/run` | POST | ✅ Real | Trigger workflow (creates WorkflowRun) | `WorkflowRun` |
| `/api/workflows/history` | GET | ✅ Real | List workflow runs | `WorkflowRun` |

---

## 6. Profit Graph (`/routes/profitGraph.ts`)

| Endpoint | Method | Status | Description | Prisma Table |
|----------|--------|--------|-------------|--------------|
| `/api/profit-graph` | GET | ✅ Real | Get current profit graph snapshot | `ProfitNode` + `ProfitEdge` |
| `/api/profit-graph/snapshot` | GET | ✅ Real | Get snapshot (alias) | `ProfitNode` + `ProfitEdge` |
| `/api/profit-graph/rebuild` | POST | 🟡 Stub | Rebuild graph weights/edges | - |
| `/api/profit-graph/snapshots` | GET | 🟡 Stub | List saved snapshots | - |
| `/api/profit-graph/snapshots` | POST | 🟡 Stub | Save current snapshot | - |

---

## 7. Bet Ledger (`/routes/bets.ts`)
**Purpose**: Track automated actions and experiments

| Endpoint | Method | Status | Description | Prisma Table |
|----------|--------|--------|-------------|--------------|
| `/api/bets` | GET | ✅ Real | List all bets | `BetLedger` |
| `/api/bets` | POST | ✅ Real | Create new bet | `BetLedger` |
| `/api/bets/stats` | GET | ✅ Real | Success rate, win/loss stats | `BetLedger` |
| `/api/bets/evaluate` | POST | 🟡 Stub | AI bet evaluation | - |

---

## 8. Integrations (`/routes/integrations.ts`)

| Endpoint | Method | Status | Description | Prisma Table |
|----------|--------|--------|-------------|--------------|
| `/api/integrations` | GET | ✅ Real | List all connected services | `Integration` |
| `/api/integrations/connect` | POST | ✅ Real | Connect new integration (stores in DB) | `Integration` |
| `/api/integrations/sync` | POST | 🟡 Stub | Manual sync trigger | - |
| `/api/integrations/quickbooks` | GET | ✅ Real | QuickBooks data | - |
| `/api/integrations/quickbooks/connect` | POST | ✅ Real | Connect QuickBooks | - |
| `/api/integrations/hubspot` | GET | ✅ Real | HubSpot data | - |
| `/api/integrations/shopify` | GET | ✅ Real | Shopify data | - |

---

## 9. Marketing (`/routes/marketing.ts`) - All Stubs

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/marketing/campaigns` | GET | 🟡 Stub | List campaigns |
| `/api/marketing/campaigns` | POST | 🟡 Stub | Create campaign |
| `/api/marketing/insights` | GET | 🟡 Stub | Marketing insights |
| `/api/audience` | GET | 🟡 Stub | Audience data |

---

## 10. Support (`/routes/support.ts`) - All Stubs

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/support/tickets` | GET | 🟡 Stub | List support tickets |
| `/api/support/tickets` | POST | 🟡 Stub | Create ticket |
| `/api/support/sentiment` | GET | 🟡 Stub | Sentiment analysis |

---

## 11. Operations (`/routes/operations.ts`) - All Stubs

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/operations` | GET | 🟡 Stub | Operations data |
| `/api/operations/bottlenecks` | GET | 🟡 Stub | Bottleneck detection |

---

## 12. Compliance (`/routes/compliance.ts`) - All Stubs

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/compliance/audit` | GET | 🟡 Stub | Audit logs |
| `/api/compliance/policies` | GET | 🟡 Stub | Compliance policies |

---

## 13. Inventory (`/routes/inventory.ts`) - All Stubs

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/inventory` | GET | 🟡 Stub | Inventory data |
| `/api/inventory/alerts` | GET | 🟡 Stub | Inventory alerts |

---

## 14. Admin (`/routes/admin.ts`)

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/admin/seed` | POST | ✅ Real | Create demo data (workspace, agents, metrics) |
| `/api/admin/reset` | POST | 🟡 Stub | Clear caches |
| `/api/admin/deploy` | GET | 🟡 Stub | Deployment info |

---

## Prisma Schema Models

All models are defined in `prisma/schema.prisma`. Here are the tables backing the routes:

### Core Models
1. **Workspace** - Multi-tenant workspaces
2. **User** - Users with roles
3. **Metric** - Business metrics (revenue, cost, etc.)
4. **Agent** - 8-core AI agents
5. **AgentTask** - Agent execution history
6. **Workflow** - Automation workflows
7. **WorkflowRun** - Workflow execution history

### Finance & Graph Models
8. **ProfitNode** - Profit graph nodes
9. **ProfitEdge** - Profit graph edges (relationships)
10. **BetLedger** - Experiment tracking
11. **BillingEvent** - Billing history

### Integration Models
12. **Integration** - Connected services
13. **TelemetryEvent** - System telemetry
14. **AdminLog** - Admin action logs

---

## API Usage Examples

### Create a Metric
```bash
curl -X POST http://localhost:3000/api/metrics \
  -H "Content-Type: application/json" \
  -d '{"name": "Monthly Revenue", "value": 50000, "workspaceId": "workspace_id"}'
```

### Get Finance Summary
```bash
curl http://localhost:3000/api/finance/summary
```

### List All Agents
```bash
curl http://localhost:3000/api/agents
```

### Create Demo Data
```bash
curl -X POST http://localhost:3000/api/admin/seed
```

### Get Profit Graph
```bash
curl http://localhost:3000/api/profit-graph
```

---

## Status Legend
- ✅ **Real**: Fully functional with database operations
- 🟡 **Stub**: Endpoint exists but returns placeholder data (ready for implementation)

---

## Next Steps

1. **Authentication**: Implement JWT-based auth in `/routes/auth.ts`
2. **Stub → Real**: Convert stub routes to real implementations as needed
3. **n8n/Make Integration**: Connect workflows to external automation
4. **AI Features**: Add OpenAI integration for insights and forecasts
5. **Testing**: Add integration tests for all routes

---

Generated: ${new Date().toISOString()}

