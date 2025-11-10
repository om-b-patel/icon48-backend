import { NextRequest } from 'next/server';
import { withAuth, listAgents, createAgent, getWorkspaceFromRequest } from '@icon48/api';

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    return listAgents(workspace.workspaceId);
  });
}

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    const body = await req.json();
    return createAgent(workspace.workspaceId, body);
  });
}


