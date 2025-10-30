import { NextRequest } from 'next/server';
import { withAuth, getMetrics, getWorkspaceFromRequest } from '@icon48/api';

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    return getMetrics(workspace.workspaceId, days);
  });
}


