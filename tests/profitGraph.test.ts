import request from "supertest";
import app from "../src/server";
import { seedProfitGraph, cleanProfitGraph } from "./utils/seed";

describe("Profit Graph Snapshot API", () => {
  beforeAll(async () => {
    await seedProfitGraph();
  });

  afterAll(async () => {
    await cleanProfitGraph();
  });

  it("should return a valid snapshot object", async () => {
    const res = await request(app).get("/api/profit-graph/snapshot");
    expect(res.status).toBe(200);
    expect(res.body.totalImpact).toBeDefined();
    expect(Array.isArray(res.body.nodes)).toBe(true);
  });
});
