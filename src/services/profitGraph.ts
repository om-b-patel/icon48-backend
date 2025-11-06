import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface ProfitNodeDTO {
  id: string;
  name: string;
  category: string;
  baselineValue: number;
  currentValue: number;
  impactWeight: number;
  delta: number;
  impactScore: number;
}

export interface ProfitEdgeDTO {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  weight: number;
  rationale: string | null;
}

export interface ProfitGraphSnapshot {
  totalImpact: number;
  nodes: ProfitNodeDTO[];
  edges: ProfitEdgeDTO[];
}

export async function getProfitGraphSnapshot(): Promise<ProfitGraphSnapshot> {
  const [nodes, edges] = await Promise.all([
    prisma.profitNode.findMany(),
    prisma.profitEdge.findMany(),
  ]);

  const nodeDTOs: ProfitNodeDTO[] = nodes.map((n) => {
    const baseline = n.baselineValue ?? 0;
    const current = n.currentValue ?? 0;
    const weight = n.impactWeight ?? 1;
    const delta = current - baseline;
    const impactScore = delta * weight;

    return {
      id: n.id,
      name: n.name,
      category: n.category ?? "uncategorized",
      baselineValue: baseline,
      currentValue: current,
      impactWeight: weight,
      delta,
      impactScore,
    };
  });

  const totalImpact = nodeDTOs.reduce((sum, n) => sum + n.impactScore, 0);

  const edgeDTOs: ProfitEdgeDTO[] = edges.map((e) => ({
    id: e.id,
    fromNodeId: e.fromNodeId ?? "",
    toNodeId: e.toNodeId ?? "",
    weight: e.weight ?? 1,
    rationale: e.rationale ?? null,
  }));

  return {
    totalImpact,
    nodes: nodeDTOs,
    edges: edgeDTOs,
  };
}
