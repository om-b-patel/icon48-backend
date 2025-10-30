# Deployment Guide

Complete step-by-step guide to deploy ICON48 to production.

## Prerequisites

- Vercel account
- Supabase account
- Stripe account
- OpenAI API key
- PostHog account
- n8n Cloud account (or self-hosted server)

## Step 1: Supabase Setup

### 1.1 Create Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for database to provision

### 1.2 Run SQL Schema

1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `packages/db/supabase/schema.sql`
3. Paste and execute

Alternatively, use Supabase CLI:
```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
```

### 1.3 Configure Authentication

1. Go to Authentication → Providers
2. Enable Email provider
3. Configure email templates
4. Set site URL to your production domain

### 1.4 Enable Vault

1. Go to Database → Extensions
2. Enable `pgsodium` and `supabase_vault`
3. Run:
```sql
CREATE EXTENSION IF NOT EXISTS pgsodium;
CREATE EXTENSION IF NOT EXISTS supabase_vault;
```

### 1.5 Get API Keys

1. Go to Settings → API
2. Copy:
   - Project URL
   - Anon (public) key
   - Service role key (keep secret!)

## Step 2: Stripe Setup

### 2.1 Create Products

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Products → Add Product

Create three products:

**Starter Plan**
- Name: ICON48 Starter
- Price: $79.99/month
- Copy Price ID

**Pro Plan**
- Name: ICON48 Pro
- Price: $279.99/month
- Copy Price ID

**Enterprise Plan**
- Name: ICON48 Enterprise
- Price: $459.00/month
- Copy Price ID

### 2.2 Configure Webhook

1. Developers → Webhooks
2. Add endpoint
3. URL: `https://your-domain.com/api/billing/webhook`
4. Listen to events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Copy webhook signing secret

### 2.3 Get API Keys

1. Developers → API Keys
2. Copy:
   - Publishable key
   - Secret key

## Step 3: n8n Setup

### Option A: n8n Cloud (Recommended)

1. Sign up at [n8n.cloud](https://n8n.cloud)
2. Create new instance
3. Go to Settings → API
4. Generate API key
5. Copy instance URL and API key

### Option B: Self-Hosted

Deploy to your server:

```bash
docker run -d \
  --name n8n \
  --restart unless-stopped \
  -p 5678:5678 \
  -e N8N_HOST=n8n.yourdomain.com \
  -e N8N_PROTOCOL=https \
  -e NODE_ENV=production \
  -e WEBHOOK_URL=https://n8n.yourdomain.com/ \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n
```

Set up reverse proxy (Nginx):

```nginx
server {
    listen 80;
    server_name n8n.yourdomain.com;

    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Get SSL certificate:
```bash
certbot --nginx -d n8n.yourdomain.com
```

## Step 4: Vercel Deployment

### 4.1 Install Vercel CLI

```bash
npm i -g vercel
```

### 4.2 Login

```bash
vercel login
```

### 4.3 Link Project

```bash
cd apps/web
vercel link
```

### 4.4 Configure Environment Variables

```bash
# Add all environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_STARTER_PRICE_ID
vercel env add STRIPE_PRO_PRICE_ID
vercel env add STRIPE_ENTERPRISE_PRICE_ID
vercel env add N8N_API_URL
vercel env add N8N_API_KEY
vercel env add OPENAI_API_KEY
vercel env add NEXT_PUBLIC_POSTHOG_KEY
vercel env add NEXT_PUBLIC_POSTHOG_HOST
vercel env add NEXT_PUBLIC_APP_URL
```

### 4.5 Deploy

```bash
vercel --prod
```

## Step 5: PostHog Setup

### 5.1 Create Project

1. Sign up at [posthog.com](https://posthog.com)
2. Create new project
3. Copy project API key

### 5.2 Configure

Add to Vercel environment variables:
```bash
vercel env add NEXT_PUBLIC_POSTHOG_KEY
# Value: phc_your_key_here

vercel env add NEXT_PUBLIC_POSTHOG_HOST
# Value: https://app.posthog.com
```

## Step 6: Database Connection

### 6.1 Get Connection String

From Supabase:
1. Settings → Database
2. Copy connection string
3. Replace `[YOUR-PASSWORD]` with actual password

### 6.2 Add to Vercel

```bash
vercel env add DATABASE_URL
# Value: postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
```

## Step 7: Domain Setup

### 7.1 Add Custom Domain

In Vercel dashboard:
1. Project → Settings → Domains
2. Add your domain (e.g., `api.icon48.com`)
3. Follow DNS configuration instructions

### 7.2 Update Environment Variables

```bash
vercel env add NEXT_PUBLIC_APP_URL production
# Value: https://api.icon48.com
```

### 7.3 Update Stripe Webhook

Update webhook URL to:
```
https://api.icon48.com/api/billing/webhook
```

### 7.4 Update Supabase Site URL

In Supabase → Authentication → URL Configuration:
- Site URL: `https://your-frontend.com`
- Redirect URLs: Add your production URLs

## Step 8: GitHub Actions Setup

### 8.1 Add Secrets

In GitHub repository → Settings → Secrets:

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
N8N_API_URL
N8N_API_KEY
OPENAI_API_KEY
NEXT_PUBLIC_POSTHOG_KEY
```

### 8.2 Enable Workflows

Workflows will run automatically on push to main/develop.

## Step 9: Testing

### 9.1 Test Authentication

```bash
curl -X POST https://api.icon48.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123",
    "fullName": "Test User"
  }'
```

### 9.2 Test Stripe Webhook

```bash
stripe listen --forward-to https://api.icon48.com/api/billing/webhook
stripe trigger checkout.session.completed
```

### 9.3 Test n8n Connection

```bash
curl https://your-n8n-instance.com/healthz
```

## Step 10: Monitoring

### 10.1 Set Up Alerts

**Vercel:**
- Enable deployment notifications
- Set up error alerts

**Supabase:**
- Configure database alerts
- Set up RLS policy monitoring

**Stripe:**
- Enable webhook failure notifications
- Set up payment failure alerts

### 10.2 Health Checks

Create health check endpoint:

```typescript
// apps/web/src/app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
```

### 10.3 Logging

Use Vercel's built-in logging or integrate with:
- LogDNA
- Datadog
- Sentry

## Step 11: Scaling

### 11.1 Database

**Supabase Scaling:**
- Monitor connection pool usage
- Upgrade plan if needed
- Enable connection pooling (PgBouncer)

### 11.2 n8n

**For high volume:**
- Use n8n Cloud Pro/Enterprise
- Or deploy multiple n8n instances with load balancer

### 11.3 Vercel

**Function Limits:**
- Free: 100GB-Hrs
- Pro: 1000GB-Hrs
- Enterprise: Custom

Upgrade if needed.

## Step 12: Security

### 12.1 Enable Rate Limiting

Use Vercel's edge middleware:

```typescript
// apps/web/src/middleware.ts
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});
```

### 12.2 Configure CORS

Already configured in `next.config.js`.

### 12.3 Security Headers

Add to `next.config.js`:

```javascript
{
  headers: [
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'origin-when-cross-origin',
    },
  ],
}
```

## Rollback Procedure

If deployment fails:

### Vercel
```bash
vercel rollback
```

### Supabase
```bash
supabase db reset
supabase db push
```

### Manual Rollback
1. Go to Vercel dashboard
2. Deployments → Select previous deployment
3. Click "Promote to Production"

## Production Checklist

- [ ] Supabase project created and schema deployed
- [ ] RLS policies enabled and tested
- [ ] Supabase Vault enabled
- [ ] Stripe products created
- [ ] Stripe webhook configured
- [ ] n8n instance running
- [ ] OpenAI API key configured
- [ ] PostHog project created
- [ ] All environment variables set in Vercel
- [ ] Custom domain configured
- [ ] SSL certificates active
- [ ] GitHub Actions secrets configured
- [ ] Authentication tested
- [ ] Billing flow tested
- [ ] Workflow execution tested
- [ ] Admin endpoints secured
- [ ] Monitoring and alerts configured
- [ ] Backup strategy implemented

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review Supabase logs
3. Test Stripe webhook delivery
4. Verify environment variables
5. Contact support@icon48.com

---

🎉 Congratulations! Your ICON48 backend is now live in production.


