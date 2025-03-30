import request from "supertest";
import app from "../server";
import { Workout } from "../models/workout";
import e from "express";

describe("Workouts API", () => {
    beforeEach(async () => {
        await Workout.deleteMany({}); // Clear the database before each test
    });

    it("should create a new workout", async () => {
        const response = await request(app).post("/workouts").send({
            type: "Morning Cardio",
            duration: 30,
            caloriesBurned: 300,
            exerciseIds: [], // Assuming exerciseIds is optional and can be an empty array
            timestamp: new Date(), // Assuming timestamp is required and should be the current date/time
        });

        expect(response.status).toBe(201);
        expect(response.body.workout).toHaveProperty("_id");
        expect(response.body.workout.type).toBe("Morning Cardio");
    });

    it("should retrieve all workouts", async () => {
        await new Workout({
            type: "Morning Cardio",
            duration: 30,
            caloriesBurned: 300,
            exerciseIds: [], // Assuming exerciseIds is optional and can be an empty array
            timestamp: new Date(),
        }).save();

        const response = await request(app).get("/workouts").redirects(1);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
