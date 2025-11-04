import { NextRequest } from 'next/server';
import { withAuth, getAgent, updateAgent, deleteAgent, getWorkspaceFromRequest } from '@icon48/api';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    return getAgent(workspace.workspaceId, params.id);
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    const body = await req.json();
    return updateAgent(workspace.workspaceId, params.id, body);
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    return deleteAgent(workspace.workspaceId, params.id);
  });
}


