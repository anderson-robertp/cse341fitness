import request from "supertest";
import app from "../server";
import { UserHealthMetrics } from "../models/user-health-metrics";
import mongoose from "mongoose"; // Import mongoose to create ObjectId for testing

describe("User Health Metrics API", () => {
    let userId: mongoose.Types.ObjectId; // Store userId for later tests

    beforeAll(async () => {
        await UserHealthMetrics.deleteMany({}); // Clear the database at the start
    });

    // Create a new user health metric
    it("should create a new user health metric", async () => {
        const response = await request(app).post("/user-health-metrics").send({
            userId: "60c72b2f9b1e8b001c8e4a2a", // Example user ID, replace with a valid one from your database
            metrics: {
                "heartRate": 88,
                "bloodPressure": {systolic: 120, diastolic: 80 },
                "bloodSugar": 90,
                "temperature": 98.6,
                "steps": 10000,
                "caloriesBurned" : 500,
                "sleepDuration": 7,
                "weight": 70,
                "hydration": 2.5,
            },
            timestamp: new Date().toISOString(), // Example timestamp, ensure it's in ISO format
        });

        expect(response.status).toBe(201);
        expect(response.body.userHealthMetrics).toHaveProperty("_id");
        expect(response.body.userHealthMetrics.weight).toBe(70);

        userId = response.body.userHealthMetrics.userId; // Store userId for later use
        console.log("Created User Health Metrics ID:", userId); // Log the created user ID for debugging purposes
    });

    // Retrieve all user health metrics
    it("should retrieve all user health metrics", async () => {
        await new UserHealthMetrics({
            userId: "60c72b2f9b1e8b001c8e4a2a", // Example user ID, replace with a valid one from your database
            metrics: {
                "heartRate": 88,
                "bloodPressure": {systolic: 120, diastolic: 80 },
                "bloodSugar": 90,
                "temperature": 98.6,
                "steps": 10000,
                "caloriesBurned" : 500,
                "sleepDuration": 7,
                "weight": 70,
                "hydration": 2.5,
            },
            timestamp: new Date().toISOString(),
        }).save();

        const response = await request(app).get("/user-health-metrics").redirects(1);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Retrieve user health metrics by user ID
    it("should retrieve user health metrics by user ID", async () => {
        const response = await request(app).get(`/user-health-metrics/${userId}`).redirects(1);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("userHealthMetrics");
        expect(response.body.userHealthMetrics.userId).toBe(userId.toString());
    });
});