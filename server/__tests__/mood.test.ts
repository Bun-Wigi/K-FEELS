import request from "supertest";
import mongoose from "mongoose";
import app from "../server.ts";

describe("Mood API Endpoints", () => {
  let moodId: string;

  // Connect to test DB before tests
  beforeAll(async () => {
    try {
      const uri = process.env.MONGO_URI_TEST;
      if (!uri) throw new Error("MONGO_URI_TEST is not defined");

      await mongoose.connect(uri);
      console.log("Test DB connected");
    } catch (err) {
      console.error("❌ Test DB connection failed:", err);
      // Do NOT rethrow — prevents Jest teardown crash
    }
  });

  // Cleanup DB + close connection
  afterAll(async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
      }
    } catch (err) {
      console.error("❌ Cleanup error:", err);
    }
  });

  it("POST /api/moods - create mood", async () => {
    const res = await request(app)
      .post("/api/moods")
      .send({ name: "Happy", description: "Feeling great!" });

    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();

    moodId = res.body._id;
  });

  it("GET /api/moods - get all moods", async () => {
    const res = await request(app).get("/api/moods");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /api/moods/:id - get mood by id", async () => {
    const res = await request(app).get(`/api/moods/${moodId}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Happy");
  });

  it("PUT /api/moods/:id - update mood", async () => {
    const res = await request(app)
      .put(`/api/moods/${moodId}`)
      .send({ description: "Feeling awesome!" });

    expect(res.status).toBe(200);
    expect(res.body.description).toBe("Feeling awesome!");
  });

  it("DELETE /api/moods/:id - delete mood", async () => {
    const res = await request(app).delete(`/api/moods/${moodId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Mood deleted successfully");
  });
});
