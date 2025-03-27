import request from "supertest";
import app from "../server";
import { Workout } from "../models/workout";

describe("Workouts API", () => {
    beforeEach(async () => {
        await Workout.deleteMany({}); // Clear the database before each test
    });

    it("should create a new workout", async () => {
        const response = await request(app).post("/workouts").send({
            name: "Morning Cardio",
            description: "30 minutes of running",
            duration: 30,
            caloriesBurned: 300,
        });

        expect(response.status).toBe(201);
        expect(response.body.workout).toHaveProperty("_id");
        expect(response.body.workout.name).toBe("Morning Cardio");
    });

    it("should retrieve all workouts", async () => {
        await new Workout({
            name: "Evening Strength",
            description: "45 minutes of weight lifting",
            duration: 45,
            caloriesBurned: 400,
        }).save();

        const response = await request(app).get("/workouts").redirects(1);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
