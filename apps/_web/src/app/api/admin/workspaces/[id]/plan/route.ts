import { NextRequest } from 'next/server';
import { requireAdmin, updateWorkspacePlan } from '@icon48/api';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return requireAdmin(req, async (req, ctx) => {
    const body: any = await req.json();
    return updateWorkspacePlan(
      ctx.profileId,
      params.id,
      body.plan,
      body.agentLimit
    );
  });
}


