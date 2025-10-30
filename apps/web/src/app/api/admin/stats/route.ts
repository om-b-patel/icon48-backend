import { NextRequest } from 'next/server';
import { requireAdmin, getSystemStats } from '@icon48/api';

export async function GET(req: NextRequest) {
  return requireAdmin(req, async (req, ctx) => {
    return getSystemStats();
  });
}


