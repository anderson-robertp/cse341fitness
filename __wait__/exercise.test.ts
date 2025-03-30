import request from "supertest";
import app from "../server";
import { Exercise } from "../models/exercise";

describe("Exercises API", () => {
    beforeEach(async () => {
        await Exercise.deleteMany({}); // Clear the database before each test
    });

    it("should create a new exercise", async () => {
        const response = await request(app).post("/exercises").send({
            name: "Push Up",
            description: "A basic upper body exercise",
            type: "strength",
            duration: 30,
            caloriesBurned: 100,
        });

        expect(response.status).toBe(201);
        expect(response.body.exercise).toHaveProperty("_id");
        expect(response.body.exercise.name).toBe("Push Up");
    });

    it("should retrieve all exercises", async () => {
        await new Exercise({
            name: "Squat",
            description: "A basic lower body exercise",
            type: "strength",
            duration: 45,
            caloriesBurned: 150,
        }).save();

        const response = await request(app).get("/exercises").redirects(1);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
