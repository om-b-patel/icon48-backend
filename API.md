# ICON48 API Reference

Complete API documentation for ICON48 backend.

## Base URL

```
Production: https://api.icon48.com
Development: http://localhost:3000
```

## Authentication

All authenticated endpoints require a Bearer token from Supabase Auth:

```http
Authorization: Bearer <supabase_jwt_token>
```

Get token from login/signup response:
```json
{
  "session": {
    "access_token": "eyJhbGc...",
    "refresh_token": "..."
  }
}
```

## Response Format

### Success Response

```json
{
  "data": { ... },
  "message": "Success"
}
```

### Error Response

```json
{
  "error": "Error message",
  "details": { ... }
}
```

## Endpoints

---

## Authentication

### POST /api/auth/signup

Create new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "secure_password123",
  "fullName": "John Doe"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "...",
    "refresh_token": "..."
  }
}
```

**Errors:**
- `400` - Invalid input
- `409` - Email already exists

---

### POST /api/auth/login

Login existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "secure_password123"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "...",
    "refresh_token": "..."
  }
}
```

**Errors:**
- `400` - Invalid input
- `401` - Invalid credentials

---

### GET /api/auth/profile

Get current user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "profile": {
    "id": "uuid",
    "userId": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "admin": false,
    "workspaceMembers": [...]
  }
}
```

---

## Workspaces

### POST /api/workspaces

Create new workspace.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "name": "My Company",
  "slug": "my-company"
}
```

**Response:** `200 OK`
```json
{
  "workspace": {
    "id": "uuid",
    "name": "My Company",
    "slug": "my-company",
    "plan": "starter",
    "agentLimit": 3
  }
}
```

---

## Workflows

### GET /api/workflows

List all workflows for workspace.

**Query Parameters:**
- `workspaceId` (required) - Workspace ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "workflows": [
    {
      "id": "uuid",
      "name": "Daily Report",
      "description": "...",
      "triggerType": "scheduled",
      "active": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "runs": [...]
    }
  ]
}
```

---

### POST /api/workflows

Create new workflow.

**Query Parameters:**
- `workspaceId` (required)

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "name": "Daily Report",
  "description": "Generate daily sales report",
  "triggerType": "scheduled",
  "config": {
    "schedule": "0 9 * * *"
  }
}
```

**Response:** `201 Created`
```json
{
  "workflow": {
    "id": "uuid",
    "name": "Daily Report",
    "active": true
  }
}
```

---

### GET /api/workflows/:id

Get workflow details.

**Query Parameters:**
- `workspaceId` (required)

**Response:** `200 OK`
```json
{
  "workflow": {
    "id": "uuid",
    "name": "Daily Report",
    "runs": [...]
  }
}
```

---

### PATCH /api/workflows/:id

Update workflow.

**Query Parameters:**
- `workspaceId` (required)

**Request:**
```json
{
  "name": "Updated Name",
  "active": false
}
```

**Response:** `200 OK`

---

### DELETE /api/workflows/:id

Delete workflow.

**Query Parameters:**
- `workspaceId` (required)

**Response:** `200 OK`
```json
{
  "success": true
}
```

---

### POST /api/workflows/:id/run

Execute workflow.

**Query Parameters:**
- `workspaceId` (required)

**Request:**
```json
{
  "input": {
    "date": "2024-01-01",
    "customParam": "value"
  }
}
```

**Response:** `202 Accepted`
```json
{
  "run": {
    "id": "uuid",
    "workflowId": "uuid",
    "status": "running",
    "startedAt": "2024-01-01T00:00:00Z"
  }
}
```

---

### POST /api/workflows/:id/clone

Clone existing workflow.

**Query Parameters:**
- `workspaceId` (required)

**Response:** `201 Created`
```json
{
  "workflow": {
    "id": "uuid",
    "name": "Daily Report (Copy)",
    "active": false
  }
}
```

---

### GET /api/runs/:id

Get workflow run details.

**Query Parameters:**
- `workspaceId` (required)

**Response:** `200 OK`
```json
{
  "run": {
    "id": "uuid",
    "status": "completed",
    "input": {...},
    "output": {...},
    "costUsd": 0.0025,
    "durationMs": 1500
  }
}
```

---

## Agents

### GET /api/agents

List all agents.

**Query Parameters:**
- `workspaceId` (required)

**Response:** `200 OK`
```json
{
  "agents": [
    {
      "id": "uuid",
      "name": "Email Assistant",
      "type": "gmail",
      "active": true,
      "tasks": [...]
    }
  ]
}
```

---

### POST /api/agents

Create new agent.

**Query Parameters:**
- `workspaceId` (required)

**Request:**
```json
{
  "name": "Email Assistant",
  "type": "gmail",
  "description": "Manages email automation",
  "config": {
    "email": "bot@company.com",
    "apiKey": "..."
  }
}
```

**Response:** `201 Created`
```json
{
  "agent": {
    "id": "uuid",
    "name": "Email Assistant",
    "type": "gmail",
    "active": true
  }
}
```

**Errors:**
- `403` - Agent limit reached for plan

---

### GET /api/agents/:id

Get agent details.

**Response:** `200 OK`

---

### PATCH /api/agents/:id

Update agent.

**Request:**
```json
{
  "name": "Updated Name",
  "active": false
}
```

**Response:** `200 OK`

---

### DELETE /api/agents/:id

Delete agent.

**Response:** `200 OK`

---

### POST /api/agents/:id/execute

Execute agent task.

**Request:**
```json
{
  "taskType": "send_email",
  "input": {
    "to": "recipient@example.com",
    "subject": "Hello",
    "body": "Message content"
  }
}
```

**Response:** `202 Accepted`
```json
{
  "task": {
    "id": "uuid",
    "agentId": "uuid",
    "taskType": "send_email",
    "status": "pending"
  }
}
```

---

## Billing

### POST /api/billing/checkout

Create Stripe checkout session.

**Query Parameters:**
- `workspaceId` (required)

**Request:**
```json
{
  "plan": "pro"
}
```

**Response:** `200 OK`
```json
{
  "url": "https://checkout.stripe.com/..."
}
```

---

### POST /api/billing/portal

Create Stripe customer portal session.

**Query Parameters:**
- `workspaceId` (required)

**Response:** `200 OK`
```json
{
  "url": "https://billing.stripe.com/..."
}
```

---

### POST /api/billing/webhook

Stripe webhook endpoint (internal use).

**Headers:**
```
stripe-signature: <signature>
```

---

## Analytics

### GET /api/metrics

Get workspace metrics.

**Query Parameters:**
- `workspaceId` (required)
- `days` (optional, default: 30)

**Response:** `200 OK`
```json
{
  "current": {
    "runsToday": 45,
    "successRate": 95.5,
    "spendToday": 2.45,
    "activeAgents": 5
  },
  "history": [...],
  "totals": {
    "totalRuns": 1250,
    "totalSpend": 125.50,
    "avgDurationMs": 2500
  }
}
```

---

## Admin (Admin Only)

### GET /api/admin/users

List all users.

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 50)

**Response:** `200 OK`
```json
{
  "users": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "pages": 3
  }
}
```

---

### GET /api/admin/users/:id

Get user details.

**Response:** `200 OK`

---

### PATCH /api/admin/workspaces/:id/plan

Update workspace plan manually.

**Request:**
```json
{
  "plan": "enterprise",
  "agentLimit": 50
}
```

**Response:** `200 OK`

---

### GET /api/admin/stats

Get system statistics.

**Response:** `200 OK`
```json
{
  "totals": {
    "users": 1500,
    "workspaces": 450,
    "workflows": 2300,
    "agents": 3200,
    "runs": 125000,
    "activeSubscriptions": 380
  },
  "planDistribution": [...],
  "today": {
    "runs": 4500,
    "revenue": 12500.00
  },
  "recentErrors": [...]
}
```

---

### GET /api/admin/logs

Get admin action logs.

**Query Parameters:**
- `page` (optional)
- `limit` (optional)

**Response:** `200 OK`

---

## Rate Limits

| Plan | Requests/min | Workflows/day |
|------|--------------|---------------|
| Starter | 60 | 10 |
| Pro | 300 | Unlimited |
| Enterprise | 1000 | Unlimited |

## Webhooks

ICON48 can send webhooks for events:

**Workflow Completed:**
```json
{
  "event": "workflow.completed",
  "workflowId": "uuid",
  "runId": "uuid",
  "status": "completed",
  "output": {...}
}
```

**Agent Task Completed:**
```json
{
  "event": "agent.task.completed",
  "agentId": "uuid",
  "taskId": "uuid",
  "status": "completed",
  "output": {...}
}
```

Configure webhook URLs in workspace settings.

## SDKs

### JavaScript/TypeScript

```typescript
import { Icon48Client } from '@icon48/sdk';

const client = new Icon48Client({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.icon48.com',
});

// Create workflow
const workflow = await client.workflows.create({
  name: 'My Workflow',
  triggerType: 'manual',
});

// Run workflow
const run = await client.workflows.run(workflow.id, {
  input: { foo: 'bar' },
});
```

### Python

```python
from icon48 import Icon48Client

client = Icon48Client(
    api_key='your-api-key',
    base_url='https://api.icon48.com'
)

# Create workflow
workflow = client.workflows.create(
    name='My Workflow',
    trigger_type='manual'
)

# Run workflow
run = client.workflows.run(workflow.id, input={'foo': 'bar'})
```

## Support

- Documentation: https://docs.icon48.com
- API Status: https://status.icon48.com
- Support: support@icon48.com


