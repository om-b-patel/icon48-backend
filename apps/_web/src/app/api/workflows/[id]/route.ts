import { NextRequest } from 'next/server';
import { withAuth, getWorkflow, updateWorkflow, deleteWorkflow, getWorkspaceFromRequest } from '@icon48/api';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    return getWorkflow(workspace.workspaceId, params.id);
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    const body: any = await req.json();
    return updateWorkflow(workspace.workspaceId, params.id, body);
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    return deleteWorkflow(workspace.workspaceId, params.id);
  });
}


