import { NextRequest } from 'next/server';
import { withAuth, createPortalSession, getWorkspaceFromRequest } from '@icon48/api';

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    return createPortalSession(workspace.workspaceId);
  });
}


