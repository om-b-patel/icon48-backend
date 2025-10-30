# Scripts Reference

Quick reference for all available npm/pnpm scripts in the ICON48 backend.

## Setup Scripts

### Initial Setup
```bash
# Automated setup (recommended)
chmod +x scripts/setup.sh
./scripts/setup.sh

# Manual setup
pnpm install
cp .env.example .env
# Edit .env with your values
cd infra && docker-compose up -d
pnpm db:push
```

## Development Scripts

### Start Development Server
```bash
pnpm dev                    # Start all packages in dev mode
pnpm --filter @icon48/web dev  # Start only web app
```

### Build
```bash
pnpm build                  # Build all packages
pnpm --filter @icon48/web build  # Build only web app
```

### Type Checking
```bash
pnpm typecheck              # Type check all packages
pnpm --filter @icon48/api typecheck  # Type check specific package
```

### Linting
```bash
pnpm lint                   # Lint all packages
pnpm --filter @icon48/web lint  # Lint specific package
```

### Code Formatting
```bash
pnpm format                 # Format all files with Prettier
```

### Testing
```bash
pnpm test                   # Run all tests
pnpm --filter @icon48/api test  # Test specific package
```

## Database Scripts

### Migrations
```bash
pnpm db:migrate             # Create and run migration
pnpm db:push                # Push schema without migration
```

### Prisma Studio
```bash
pnpm db:studio              # Open Prisma Studio
```

### Generate Client
```bash
cd packages/db
pnpm prisma generate        # Generate Prisma client
```

### Reset Database
```bash
cd packages/db
pnpm prisma migrate reset   # Reset database (WARNING: deletes data)
```

## Infrastructure Scripts

### Docker Compose
```bash
# Start all services
cd infra
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart specific service
docker-compose restart postgres
docker-compose restart n8n
docker-compose restart redis
```

### Individual Services
```bash
# PostgreSQL
docker-compose up -d postgres
docker-compose logs -f postgres

# n8n
docker-compose up -d n8n
docker-compose logs -f n8n

# Redis
docker-compose up -d redis
docker-compose logs -f redis
```

## Testing Scripts

### API Testing
```bash
# Run API tests
chmod +x scripts/test-api.sh
./scripts/test-api.sh

# Test specific endpoint
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Stripe Testing
```bash
# Listen to webhooks locally
stripe listen --forward-to localhost:3000/api/billing/webhook

# Trigger test event
stripe trigger checkout.session.completed
```

## Production Scripts

### Build for Production
```bash
pnpm build
NODE_ENV=production pnpm start
```

### Deploy to Vercel
```bash
cd apps/web
vercel --prod
```

### Database Migration in Production
```bash
# Using Supabase CLI
supabase db push

# Or using Prisma
DATABASE_URL="<production-url>" pnpm db:push
```

## Utility Scripts

### Clean All
```bash
pnpm clean                  # Clean build artifacts
rm -rf node_modules
pnpm install                # Reinstall dependencies
```

### Update Dependencies
```bash
pnpm update                 # Update all dependencies
pnpm outdated               # Check for outdated packages
```

### Check Package Versions
```bash
node --version              # Should be 18+
pnpm --version              # Should be 8+
docker --version
```

## Package-Specific Scripts

### @icon48/web (Next.js App)
```bash
cd apps/web

pnpm dev                    # Dev server
pnpm build                  # Production build
pnpm start                  # Start production server
pnpm lint                   # Lint code
pnpm typecheck              # Type check
```

### @icon48/api (API Package)
```bash
cd packages/api

pnpm typecheck              # Type check
pnpm test                   # Run tests
```

### @icon48/db (Database Package)
```bash
cd packages/db

pnpm db:generate            # Generate Prisma client
pnpm db:push                # Push schema
pnpm db:migrate             # Create migration
pnpm db:studio              # Open Prisma Studio
```

### @icon48/agents (Agents Package)
```bash
cd packages/agents

pnpm typecheck              # Type check
pnpm test                   # Run tests
```

## CI/CD Scripts

### GitHub Actions (automatic)
```bash
# Triggered on push/PR:
- Lint
- Type check
- Build
- Test
- Deploy (main branch only)
```

### Manual Deployment
```bash
# Trigger deployment manually
git push origin main
```

## Troubleshooting Scripts

### Reset Everything
```bash
# Stop all services
cd infra && docker-compose down

# Clean all
pnpm clean
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules

# Reinstall
pnpm install

# Restart infrastructure
cd infra && docker-compose up -d

# Reset database
pnpm db:push
```

### View Logs
```bash
# Application logs (Vercel)
vercel logs

# Docker logs
docker-compose logs -f

# Specific service logs
docker-compose logs -f postgres
docker-compose logs -f n8n
```

### Database Debugging
```bash
# Connect to PostgreSQL
docker exec -it icon48_postgres psql -U postgres -d icon48

# View tables
\dt

# View specific table
SELECT * FROM profiles;

# Exit
\q
```

### Check Service Health
```bash
# Check API
curl http://localhost:3000

# Check n8n
curl http://localhost:5678/healthz

# Check PostgreSQL
docker exec icon48_postgres pg_isready
```

## Environment-Specific Scripts

### Development
```bash
NODE_ENV=development pnpm dev
```

### Staging
```bash
NODE_ENV=staging pnpm build
vercel --env staging
```

### Production
```bash
NODE_ENV=production pnpm build
vercel --prod
```

## Quick Commands Cheatsheet

```bash
# Most used commands
pnpm dev              # Start development
pnpm build            # Build for production
pnpm lint             # Lint code
pnpm typecheck        # Type check
pnpm db:studio        # Open database GUI
pnpm db:push          # Update database schema

# Infrastructure
cd infra && docker-compose up -d     # Start services
cd infra && docker-compose down      # Stop services
cd infra && docker-compose logs -f   # View logs

# Testing
./scripts/test-api.sh                # Test API endpoints
stripe listen --forward-to localhost:3000/api/billing/webhook

# Deployment
vercel --prod                        # Deploy to production
```

## Help & Documentation

- **Full Documentation**: See `README.md`
- **API Reference**: See `API.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Contributing**: See `CONTRIBUTING.md`

## Support

If you encounter issues with any scripts:

1. Check that all prerequisites are installed
2. Verify environment variables are set
3. Check service logs with `docker-compose logs`
4. Refer to troubleshooting section above
5. Contact support@icon48.com

---

Happy coding! 🚀


