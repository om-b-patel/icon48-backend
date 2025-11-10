# 🚀 Vercel Deployment Guide for ICON48 Backend

## ✅ Fix Applied

**Issue**: `Cannot GET /api/health` on Vercel production
**Solution**: Consolidated Express app into single `src/index.ts` file for proper serverless export

### What Changed

**Before**: Express app split across multiple files (app.ts → server.ts → index.ts)
**After**: Single consolidated `index.ts` with direct Express app export

### Key Changes in `src/index.ts`
- ✅ All route imports in one place
- ✅ Middleware configured (cors, json, telemetry)
- ✅ All routes mounted at `/api` prefix
- ✅ Explicit `/api/health` endpoint added
- ✅ Conditional listener (local only)
- ✅ Default export for Vercel serverless

---

## 📋 Pre-Deployment Checklist

### 1. Verify Local Environment
```bash
# All routes should be passing
node scripts/verifyRoutes.js

# Expected output:
# 🎉 All routes working!
# 17/17 passed
```

### 2. Merge to Main Branch (if on feature branch)
```bash
# Check current branch
git branch --show-current

# If on backend-deploy, merge to main:
git checkout main
git merge backend-deploy
git push origin main
```

### 3. Set Vercel Environment Variables

Go to your Vercel project dashboard and add:

**Required Variables:**
- `DATABASE_URL` - Your PostgreSQL connection string (from Neon/Supabase)
- `NODE_ENV` - Set to `production` (Vercel sets this automatically)

**Optional Variables** (if using these services):
- `STRIPE_SECRET_KEY`
- `OPENAI_API_KEY`
- `POSTHOG_KEY`
- `N8N_API_URL`
- `N8N_API_KEY`

---

## 🚀 Deploy to Vercel

### Option 1: CLI Deployment (Recommended)
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod --force

# Or deploy to preview first
vercel
```

### Option 2: GitHub Integration
1. Connect your GitHub repository to Vercel
2. Vercel will auto-deploy on every push to main
3. Check deployment logs in Vercel dashboard

---

## ✅ Post-Deployment Verification

### 1. Test Health Endpoint
```bash
# Replace with your actual Vercel URL
curl https://icon48-backend.vercel.app/api/health

# Expected response:
# {"status":"ok"}
```

### 2. Test Key Endpoints
```bash
# System status
curl https://icon48-backend.vercel.app/api/status

# List agents
curl https://icon48-backend.vercel.app/api/agents

# Finance summary
curl https://icon48-backend.vercel.app/api/finance/summary

# Profit graph
curl https://icon48-backend.vercel.app/api/profit-graph
```

### 3. Run Full Verification (Update script URL first)
Edit `scripts/verifyRoutes.js` and change:
```javascript
const baseURL = "https://icon48-backend.vercel.app/api";
```

Then run:
```bash
node scripts/verifyRoutes.js
```

---

## 🔧 Troubleshooting

### Issue: Still getting 404 errors

**Check:**
1. Verify `vercel.json` points to `src/index.ts`:
```json
{
  "version": 2,
  "framework": null,
  "builds": [
    { "src": "src/index.ts", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "src/index.ts" }
  ]
}
```

2. Check Vercel build logs for errors
3. Ensure `DATABASE_URL` is set in Vercel environment variables

### Issue: Database connection errors

**Check:**
1. Verify `DATABASE_URL` format:
   ```
   postgresql://user:password@host:5432/database?sslmode=require
   ```
2. Check if database allows connections from Vercel IPs
3. For Neon: Use pooled connection string in production

### Issue: Prisma Client errors

**Solution:**
Add a `postbuild` script to `package.json`:
```json
{
  "scripts": {
    "postbuild": "prisma generate"
  }
}
```

Or add to `vercel.json`:
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["prisma/**"]
      }
    }
  ]
}
```

---

## 📊 Expected Vercel URLs

After deployment, your API will be available at:

```
Base URL: https://icon48-backend.vercel.app

Endpoints:
├── /api/health              → Health check
├── /api/status              → System status
├── /api/auth/*              → Authentication
├── /api/users               → User management
├── /api/metrics             → Business metrics
├── /api/finance/*           → Financial data
├── /api/agents              → AI agents
├── /api/workflows           → Workflows
├── /api/profit-graph        → Profit graph
├── /api/bets                → Experiments
├── /api/integrations        → Integrations
├── /api/marketing/*         → Marketing
├── /api/support/*           → Support
├── /api/operations          → Operations
├── /api/compliance/*        → Compliance
├── /api/inventory           → Inventory
└── /api/admin/*             → Admin tools
```

---

## 🔐 Security Notes

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Use Vercel environment variables
3. **Database**: Use connection pooling for serverless
4. **CORS**: Configure allowed origins in production
5. **Rate Limiting**: Consider adding rate limiting middleware

---

## 📈 Monitoring

### Vercel Analytics
- Enable in Vercel dashboard → Analytics
- Monitor response times and errors

### Custom Logging
Add to your routes:
```typescript
console.log('[API]', req.method, req.path, res.statusCode);
```

Logs visible in:
- Vercel Dashboard → Deployments → Function Logs
- Real-time: `vercel logs --follow`

---

## 🎯 Performance Tips

1. **Use Prisma Connection Pooling**:
```typescript
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
```

2. **Enable Vercel Edge Caching**:
```typescript
app.get('/api/metrics', (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  // ... rest of handler
});
```

3. **Optimize Prisma Queries**:
- Use `select` to fetch only needed fields
- Add database indexes for frequently queried fields
- Use connection pooling (PgBouncer for Neon)

---

## ✅ Success Criteria

Your deployment is successful when:

- ✅ `/api/health` returns `{"status":"ok"}`
- ✅ All 17 routes respond with 200 status
- ✅ Database queries work correctly
- ✅ No errors in Vercel function logs
- ✅ Response times under 1 second

---

## 📞 Need Help?

**Common Resources:**
- Vercel Docs: https://vercel.com/docs
- Prisma + Vercel: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel
- This project's docs:
  - `ROUTES_DOCUMENTATION.md` - API reference
  - `SETUP_COMPLETE.md` - Full setup guide
  - `HEALTH_CHECK_REPORT.md` - System audit

---

**Last Updated**: ${new Date().toLocaleString()}
**Deployment Status**: ✅ Ready for Production

