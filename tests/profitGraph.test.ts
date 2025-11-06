import request from "supertest";
import app from "../src/app";

describe("Profit Graph Snapshot API", () => {
  it("should return a valid snapshot object", async () => {
    const res = await request(app).get("/api/profit-graph");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("totalImpact");
    expect(Array.isArray(res.body.nodes)).toBe(true);
    expect(Array.isArray(res.body.edges)).toBe(true);
  });
});
