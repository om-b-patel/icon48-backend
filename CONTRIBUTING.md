# Contributing to ICON48

Thank you for your interest in contributing to ICON48! This guide will help you get started.

## Development Setup

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/icon48-backend.git
cd icon48-backend
```

3. Install dependencies:
```bash
pnpm install
```

4. Set up environment variables:
```bash
cp .env.example .env
# Fill in your values
```

5. Start infrastructure:
```bash
cd infra
docker-compose up -d
```

6. Run database migrations:
```bash
pnpm db:push
```

7. Start development server:
```bash
pnpm dev
```

## Project Structure

```
icon48-backend/
├── apps/
│   └── web/              # Next.js app with API routes
├── packages/
│   ├── api/              # API handlers
│   ├── db/               # Database & Prisma
│   └── agents/           # AI agents & workflow executors
├── infra/                # Infrastructure (Docker, etc.)
└── .github/workflows/    # CI/CD
```

## Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

### Formatting

```bash
pnpm format
```

### Linting

```bash
pnpm lint
```

### Type Checking

```bash
pnpm typecheck
```

## Commit Messages

Follow Conventional Commits:

```
feat: add new workflow trigger type
fix: resolve authentication bug
docs: update API documentation
chore: update dependencies
refactor: simplify workflow executor
test: add unit tests for billing
```

## Pull Request Process

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes
3. Add tests if applicable
4. Run tests and linting:
```bash
pnpm lint
pnpm typecheck
pnpm test
```

5. Commit your changes:
```bash
git commit -m "feat: add your feature"
```

6. Push to your fork:
```bash
git push origin feature/your-feature-name
```

7. Create a Pull Request

## Testing

### Unit Tests

```bash
pnpm test
```

### Integration Tests

```bash
pnpm test:integration
```

### E2E Tests

```bash
pnpm test:e2e
```

## Adding New Features

### New API Endpoint

1. Create handler in `packages/api/src/`:
```typescript
// packages/api/src/my-feature.ts
export async function myFeature(data: any) {
  // Implementation
}
```

2. Export from index:
```typescript
// packages/api/src/index.ts
export * from './my-feature';
```

3. Create route:
```typescript
// apps/web/src/app/api/my-feature/route.ts
import { withAuth, myFeature } from '@icon48/api';

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, ctx) => {
    const body = await req.json();
    return myFeature(body);
  });
}
```

4. Add tests:
```typescript
// packages/api/src/__tests__/my-feature.test.ts
describe('myFeature', () => {
  it('should work', async () => {
    // Test implementation
  });
});
```

### New Database Table

1. Update Prisma schema:
```prisma
// packages/db/prisma/schema.prisma
model MyTable {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now())
}
```

2. Create migration:
```bash
pnpm db:migrate
```

3. Update SQL schema:
```sql
-- packages/db/supabase/schema.sql
CREATE TABLE my_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE my_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "..." ON my_table ...;
```

### New Agent Type

1. Create agent implementation:
```typescript
// packages/agents/src/my-agent.ts
export class MyAgent {
  async execute(task: any) {
    // Implementation
  }
}
```

2. Register agent type:
```typescript
// packages/agents/src/index.ts
export * from './my-agent';
```

3. Update schema:
```prisma
enum AgentType {
  openai
  notion
  gmail
  slack
  sheets
  custom
  my_agent // Add here
}
```

## Documentation

Update documentation when:
- Adding new API endpoints → `API.md`
- Changing setup process → `README.md`
- Modifying deployment → `DEPLOYMENT.md`
- Adding features → Update relevant docs

## Code Review

All PRs require:
- ✅ Passing CI/CD
- ✅ Code review approval
- ✅ Tests (if applicable)
- ✅ Documentation updates
- ✅ No merge conflicts

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release tag:
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

4. GitHub Actions will automatically deploy

## Getting Help

- 💬 Discord: [discord.gg/icon48](https://discord.gg/icon48)
- 📧 Email: dev@icon48.com
- 📖 Docs: [docs.icon48.com](https://docs.icon48.com)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Code of Conduct

Please be respectful and professional in all interactions.

---

Thank you for contributing to ICON48! 🚀


