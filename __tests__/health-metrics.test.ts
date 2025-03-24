import request from "supertest";
import app from "../server";
//import { InitializeInMemoryDatabase, CloseInMemoryDatabase } from "../db/connection";
import { HealthMetric } from "../models/health-metrics";

describe("Health Metrics API", () => {
    beforeEach(async () => {
        await HealthMetric.deleteMany({}); // Clear the database before each test
    });

    it("should create a new health metric", async () => {
        const response = await request(app)
            .post("/health-metrics")
            .send({
                weight: 70,
                height: 175,
                bodyFatPercentage: 15,
                muscleMass: 30,
                waterPercentage: 60,
            });

        expect(response.status).toBe(201);
        expect(response.body.healthMetric).toHaveProperty("_id");
        expect(response.body.healthMetric.weight).toBe(70);
    });

    it("should retrieve all health metrics", async () => {
        await new HealthMetric({
            weight: 75,
            height: 180,
            bodyFatPercentage: 18,
            muscleMass: 32,
            waterPercentage: 58,
        }).save();

        const response = await request(app).get("/health-metrics").redirects(1);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
}
);
// Note: The above test suite assumes that the server is running and the database connection is established.
