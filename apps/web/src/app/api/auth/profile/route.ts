import { NextRequest } from 'next/server';
import { withAuth, getProfile } from '@icon48/api';

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, ctx) => {
    return getProfile(ctx.userId);
  });
}


