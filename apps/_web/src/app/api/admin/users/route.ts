import { NextRequest } from 'next/server';
import { requireAdmin, listUsers } from '@icon48/api';

export async function GET(req: NextRequest) {
  return requireAdmin(req, async (req, ctx) => {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    return listUsers(page, limit);
  });
}


