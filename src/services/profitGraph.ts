import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type ProfitNodeDTO = {
  id: string;
  name: string;
  category: string;
  baselineValue: number;
  currentValue: number;
  impactWeight: number;
  delta: number;
  impactScore: number;
};

export type ProfitGraphSnapshot = {
  totalImpact: number;
  nodes: ProfitNodeDTO[];
  edges: {
    id: string;
    fromNodeId: string;
    toNodeId: string;
    weight: number;
    rationale: string | null;
  }[];
  topPositive: string[];
  topNegative: string[];
  generatedAt: string;
};

export async function getProfitGraphSnapshot(): Promise<ProfitGraphSnapshot> {
  const [nodes, edges] = await Promise.all([
    prisma.profitNode.findMany(),
    prisma.profitEdge.findMany(),
  ]);

  const nodeDTOs: ProfitNodeDTO[] = nodes.map((n) => {
    const delta = n.currentValue - n.baselineValue;
    const impactScore = delta * n.impactWeight;
    return {
      id: n.id,
      name: n.name,
      category: n.category,
      baselineValue: n.baselineValue,
      currentValue: n.currentValue,
      impactWeight: n.impactWeight,
      delta,
      impactScore,
    };
  });

  const totalImpact = nodeDTOs.reduce((sum, n) => sum + n.impactScore, 0);
  const topPositive = nodeDTOs
    .filter((n) => n.impactScore > 0)
    .sort((a, b) => b.impactScore - a.impactScore)
    .slice(0, 3)
    .map((n) => n.name);
  const topNegative = nodeDTOs
    .filter((n) => n.impactScore < 0)
    .sort((a, b) => a.impactScore - b.impactScore)
    .slice(0, 3)
    .map((n) => n.name);

  return {
    totalImpact,
    nodes: nodeDTOs,
    edges: edges.map((e) => ({
      id: e.id,
      fromNodeId: e.fromNodeId,
      toNodeId: e.toNodeId,
      weight: e.weight,
      rationale: e.rationale ?? null,
    })),
    topPositive,
    topNegative,
    generatedAt: new Date().toISOString(),
  };
}
