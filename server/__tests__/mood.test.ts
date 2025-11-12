import request from "supertest";
import app from "../server.ts";

describe("Mood API Endpoints", () => {
  let moodId: string;

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
