import request from "supertest";
import app from "../server";
import { UserHealthMetrics } from "../models/user-health-metrics";
import mongoose from "mongoose"; // Import mongoose to create ObjectId for testing

describe("User Health Metrics API", () => {
    let userObjectId: mongoose.Types.ObjectId; // Store userId for later tests
    let userId: string; // Store userId for later tests
    let userHealthMetricsId: mongoose.Types.ObjectId; // Store user health metrics ID for later tests

    beforeAll(async () => {
        await UserHealthMetrics.deleteMany({}); // Clear the database at the start
    });

    // Create a new user health metric
    it("should create a new user health metric", async () => {
        userId = "60c72b2f9b1e8b001c8e4a2a"; // Example user ID, replace with a valid one from your database
        const response = await request(app)
            .post("/user-health-metrics/" + userId) // Use the userId in the URL
            .set("Content-Type", "application/json")
            .send({
                metrics: {
                    heartRate: 88,
                    bloodPressure: { systolic: 120, diastolic: 80 },
                    bloodSugar: 90,
                    temperature: 98.6,
                    steps: 10000,
                    caloriesBurned: 500,
                    sleepDuration: 7,
                    weight: 70,
                    hydration: 2.5,
                },
            });

        //console.log("Response body:", response.body); // Log the response body for debugging
        //console.log("Response status:", response.status); // Log the response status for debugging
        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty("_id");
        expect(response.body.data.metrics.weight).toBe(70);
        
        userHealthMetricsId = response.body.data._id; // Store user health metrics ID for later use
        //console.log("Created User Health Metrics ID:", userHealthMetricsId); // Log the created user health metrics ID for debugging purposes
        userObjectId = response.body.data.userId; // Store userId for later use
        //console.log("Created User Health Metrics ID:", userId); // Log the created user ID for debugging purposes
    });

    // Retrieve all user health metrics
    it("should retrieve all user health metrics", async () => {
        const response = await request(app)
            .post("/user-health-metrics/" + userId) // Use the userId in the URL
            .set("Content-Type", "application/json")
            .send({
                metrics: {
                    heartRate: 88,
                    bloodPressure: { systolic: 120, diastolic: 80 },
                    bloodSugar: 90,
                    temperature: 98.6,
                    steps: 10000,
                    caloriesBurned: 500,
                    sleepDuration: 7,
                    weight: 70,
                    hydration: 2.5,
                },
            });
        //console.log("Get All Add Response body:", response.body); // Log the response body for debugging
 

        const userResponse = await request(app)
            .get("/user-health-metrics/all")
            .redirects(1);
        //console.log("Get All Response body:", userResponse.body); // Log the response body for debugging

        expect(userResponse.status).toBe(200);
        expect(Array.isArray(userResponse.body)).toBe(true);
    });

    // Retrieve user health metrics by user ID
    it("should retrieve user health metrics by user ID", async () => {
        const response = await request(app)
            .get(`/user-health-metrics/${userId}`)
            .redirects(1);

        console.log("Get User Response body:", response.body); // Log the response body for debugging
        //console.log("Get User Response status:", response.status); // Log the response status for debugging
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        (response.body as Array<any>).forEach((entry) => {
            expect(entry).toHaveProperty("_id");
            expect(entry).toHaveProperty("userId", "60c72b2f9b1e8b001c8e4a2a");
            expect(entry).toHaveProperty("timestamp");
            expect(entry).toHaveProperty("__v", 0);

            expect(entry).toHaveProperty("metrics");
            expect(entry.metrics).toHaveProperty("heartRate", 88);
            expect(entry.metrics).toHaveProperty("bloodSugar", 90);
            expect(entry.metrics).toHaveProperty("temperature", 98.6);
            expect(entry.metrics).toHaveProperty("steps", 10000);
            expect(entry.metrics).toHaveProperty("caloriesBurned", 500);
            expect(entry.metrics).toHaveProperty("sleepDuration", 7);
            expect(entry.metrics).toHaveProperty("weight", 70);
            expect(entry.metrics).toHaveProperty("hydration", 2.5);

            expect(entry.metrics).toHaveProperty("bloodPressure");
            expect(entry.metrics.bloodPressure).toHaveProperty("systolic");
            expect(entry.metrics.bloodPressure).toHaveProperty("diastolic");
        });
    });

    // Update a user health metric
    it("should update a user health metric", async () => {
        const response = await request(app)
            .put(`/user-health-metrics/${userId}/${userHealthMetricsId}`) // Use the user health metrics ID in the URL
            .set("Content-Type", "application/json")
            .send({
                metrics: {
                    heartRate: 90,
                    bloodPressure: { systolic: 125, diastolic: 85 },
                    bloodSugar: 95,
                    temperature: 98.7,
                    steps: 12000,
                    caloriesBurned: 600,
                    sleepDuration: 8,
                    weight: 72,
                    hydration: 3.0,
                },
            });

        expect(response.status).toBe(200);
        expect(response.body.data.metrics.weight).toBe(72);
    }   );
    
    // Delete a user health metric
    it("should delete a user health metric", async () => {
        const response = await request(app)
            .delete(`/user-health-metrics/${userHealthMetricsId}`) // Use the user health metrics ID in the URL
            .redirects(1);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Health metric deleted");
    });
    // Check if the metric is deleted

});
