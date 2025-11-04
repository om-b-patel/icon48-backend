import { NextRequest } from 'next/server';
import { withAuth, executeAgentTask, getWorkspaceFromRequest } from '@icon48/api';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (req, ctx) => {
    const workspace = await getWorkspaceFromRequest(req, ctx);
    if (workspace instanceof Response) return workspace;
    
    const body: any = await req.json();
    return executeAgentTask(
      workspace.workspaceId,
      params.id,
      body.taskType,
      body.input
    );
  });
}


