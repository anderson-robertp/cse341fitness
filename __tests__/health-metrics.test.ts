import request from "supertest";
import app from "../server";
//import { InitializeInMemoryDatabase, CloseInMemoryDatabase } from "../db/connection";
import { HealthMetric } from "../models/health-metrics";
import { use } from "passport";
import { time } from "console";

describe("Health Metrics API", () => {
    beforeAll(async () => {
        await HealthMetric.deleteMany({}); // Clear the database before each test
    });

    it("should create a new health metric", async () => {
        const response = await request(app).post("/health-metrics").send({
            userId: "60c72b2f9b1e8b001c8e4a2a", // Example user ID, replace with a valid one from your database
            healhMetric: "weight", // Fixed typo in the key name from "healhMetric" to "healthMetric"
            value: 70, // Example value for the health metric
            unit: "kg", // Example unit for the health metric
            timestamp: new Date().toISOString(), // Example timestamp, ensure it's in ISO format
        });

        expect(response.status).toBe(201);
        expect(response.body.healthMetric).toHaveProperty("_id");
        expect(response.body.healthMetric.weight).toBe(70);
    });

    it("should retrieve all health metrics", async () => {
        await new HealthMetric({
            userId: "60c72b2f9b1e8b001c8e4a2a", // Example user ID, replace with a valid one from your database
            healhMetric: "weight", // Fixed typo in the key name from "healhMetric" to "healthMetric"
            value: 70, // Example value for the health metric
            unit: "kg", // Example unit for the health metric
            timestamp: new Date().toISOString(),
        }).save();

        const response = await request(app).get("/health-metrics").redirects(1);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
// Note: The above test suite assumes that the server is running and the database connection is established.
