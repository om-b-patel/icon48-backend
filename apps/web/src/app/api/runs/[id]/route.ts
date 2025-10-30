import { NextRequest } from 'next/server';
import { withAuth, getWorkflowRun, getWorkspaceFromRequest } from '@icon48/api';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    return getWorkflowRun(workspace.workspaceId, params.id);
  });
}


