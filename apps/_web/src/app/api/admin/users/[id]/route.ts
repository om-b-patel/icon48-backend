import { NextRequest } from 'next/server';
import { requireAdmin, getUserDetails } from '@icon48/api';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return requireAdmin(req, async (req, ctx) => {
    return getUserDetails(params.id);
  });
}


