import request from "supertest";
import app from "../server";
import { Exercise } from "../models/exercise";
import { time } from "console";

describe("Exercises API", () => {
    beforeAll(async () => {
        await Exercise.deleteMany({}); // Clear the database before each test
    });

    it("should create a new exercise", async () => {
        const response = await request(app).post("/exercises").send({
            name: "Push Up",
            type: "strength", 
            duration: 30,
            sets: 3,
            reps: 10,
            weight: 0,
            caloriesBurned: 100,
        });

        console.log(response.body); // Log the response body for debugging

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.name).toBe("Push Up");
    });

    it("should retrieve all exercises", async () => {
        const timestamp = new Date(); // Set the current timestamp
        await new Exercise({
            name: "Squat",
            type: "strength",
            duration: 45,
            sets: 4,
            reps: 8,
            weight: 50,
            caloriesBurned: 150,
            timestamp: timestamp, // Set the timestamp
        }).save();

        const response = await request(app).get("/exercises").redirects(1);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    //Get an exercise by ID
    it("should retrieve an exercise by ID", async () => {
        const timestamp = new Date(); // Set the current timestamp
        const newExercise = await new Exercise({
            name: "Lunges",
            type: "strength",
            duration: 30,
            sets: 3,
            reps: 10,
            weight: 20,
            caloriesBurned: 120,
            timestamp: timestamp, // Set the timestamp
        }).save();

        const response = await request(app).get(`/exercises/${newExercise._id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Lunges");
    }
    );

    // Update an exercise by ID
    it("should update an exercise by ID", async () => {
        const timestamp = new Date(); // Set the current timestamp
        const newExercise = await new Exercise({
            name: "Plank",
            type: "strength",
            duration: 60,
            sets: 2,
            reps: 5,
            weight: 0,
            caloriesBurned: 200,
            timestamp: timestamp, // Set the timestamp
        }).save();

        const response = await request(app)
            .put(`/exercises/${newExercise._id}`)
            .send({ duration: 90 });

        expect(response.status).toBe(200);
        expect(response.body.duration).toBe(90);
    });

    // Delete an exercise by ID
    it("should delete an exercise by ID", async () => {
        const timestamp = new Date(); // Set the current timestamp
        const newExercise = await new Exercise({
            name: "Burpees",
            type: "strength",
            duration: 30,
            sets: 3,
            reps: 10,
            weight: 0,
            caloriesBurned: 150,
            timestamp: timestamp, // Set the timestamp
        }).save();

        const response = await request(app).delete(`/exercises/${newExercise._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Exercise deleted successfully");
    }
    );
});
