import request from "supertest";
import app from "../src/app";

describe("ICON48 Backend Health", () => {
  it("should respond with 200 OK at root endpoint", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("ICON48 backend API running");
  });
});
