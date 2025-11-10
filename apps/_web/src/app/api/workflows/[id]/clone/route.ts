import { NextRequest } from 'next/server';
import { withAuth, cloneWorkflow, getWorkspaceFromRequest } from '@icon48/api';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    return cloneWorkflow(workspace.workspaceId, params.id);
  });
}


