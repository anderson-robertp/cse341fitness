import request from "supertest";
import app from "../server"; // Assuming your server is exported from the main app file
import { Achievement } from "../models/achievement";

describe("Achievements API", () => {
  beforeEach(async () => {
    await Achievement.deleteMany({}); // Clear the database before each test
  });

  it("should create a new achievement", async () => {
    const response = await request(app)
        .post("/achievements")
        .send({
            title: "First Quest",
            description: "Complete your first workout",
            progressGoal: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body.achievement).toHaveProperty("_id");
    expect(response.body.achievement.title).toBe("First Quest");
  });

  it("should retrieve all achievements", async () => {
    await new Achievement({ title: "Test", description: "Sample", progressGoal: 10 }).save();
    const response = await request(app).get("/achievements").redirects(1);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
