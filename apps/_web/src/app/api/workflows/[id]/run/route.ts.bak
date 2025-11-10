import { NextRequest } from 'next/server';
import { withAuth, runWorkflow, getWorkspaceFromRequest } from '@icon48/api';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    const body = await req.json();
    return runWorkflow(workspace.workspaceId, params.id, body.input);
  });
}


