import { NextRequest } from 'next/server';
import { withAuth, listWorkflows, createWorkflow, getWorkspaceFromRequest } from '@icon48/api';

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    return listWorkflows(workspace.workspaceId);
  });
}

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    const body: any = await req.json();
    return createWorkflow(workspace.workspaceId, body);
  });
}


