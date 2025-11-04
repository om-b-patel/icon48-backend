import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Seeds temporary nodes + edges before each test
export async function seedProfitGraph() {
  const nodes = await prisma.profitNode.createMany({
    data: [
      { name: "Test Profit", category: "finance", baselineValue: 100, currentValue: 120, impactWeight: 1.1 },
      { name: "Test Efficiency", category: "operations", baselineValue: 80, currentValue: 90, impactWeight: 0.9 },
    ],
  });

  const allNodes = await prisma.profitNode.findMany();
  const profit = allNodes.find(n => n.name === "Test Profit");
  const efficiency = allNodes.find(n => n.name === "Test Efficiency");

  if (profit && efficiency) {
    await prisma.profitEdge.create({
      data: {
        fromNodeId: efficiency.id,
        toNodeId: profit.id,
        weight: 0.5,
        rationale: "Efficiency supports profit growth"
      },
    });
  }

  return { nodes: allNodes };
}

// Cleans up everything after tests
export async function cleanProfitGraph() {
  await prisma.profitEdge.deleteMany();
  await prisma.profitNode.deleteMany();
}
