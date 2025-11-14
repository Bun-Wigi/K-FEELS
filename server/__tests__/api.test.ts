import request from "supertest";
import mongoose from "mongoose";
import app from "../server.ts";

describe("K-Drama API Endpoints", () => {
  beforeAll(async () => {
    try {
      const uri = process.env.MONGO_URI_TEST;
      if (!uri) throw new Error("Missing MONGO_URI_TEST");

      await mongoose.connect(uri);
      console.log("Test DB connected");
    } catch (err) {
      console.error("❌ Test DB connection failed:", err);
      // Do NOT throw. Let tests run so Jest doesn't crash.
    }
  });

  afterAll(async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
      }
    } catch (err) {
      console.error("❌ Error during test DB cleanup:", err);
    }
  });

  it("GET /api/kdramas - should return top 10 popular K-dramas", async () => {
    const res = await request(app).get("/api/kdramas");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeLessThanOrEqual(10);

    res.body.forEach((drama: any) => {
      expect(drama).toHaveProperty("name");
      expect(drama).toHaveProperty("genre_ids");
      expect(drama).toHaveProperty("genre_names");
      expect(Array.isArray(drama.genre_names)).toBe(true);
    });
  });

  it("GET /api/kdramas/search?query=<title> - should return search results", async () => {
    const query = "Vincenzo";
    const res = await request(app).get(`/api/kdramas/search?query=${query}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((drama: any) => {
      expect(drama).toHaveProperty("name");
      expect(drama).toHaveProperty("genre_ids");
      expect(drama).toHaveProperty("genre_names");
    });
  });

  it("GET /api/kdramas/search without query - should return 400", async () => {
    const res = await request(app).get("/api/kdramas/search");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Query parameter is required");
  });

  it("GET /api/kdramas?genreId=35 - should filter by genre", async () => {
    const genreId = 35;
    const res = await request(app).get(`/api/kdramas?genreId=${genreId}`);

    expect(res.status).toBe(200);
    res.body.forEach((drama: any) => {
      expect(drama.genre_ids).toContain(genreId);
    });
  });
});
