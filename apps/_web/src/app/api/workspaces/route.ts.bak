import { NextRequest } from 'next/server';
import { withAuth, createWorkspace } from '@icon48/api';

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, ctx) => {
    const body = await req.json();
    return createWorkspace(ctx.userId, body);
  });
}


