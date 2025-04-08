import request from "supertest";
import app from "../server";
import { Workout } from "../models/workout";

describe("Workouts API", () => {
    beforeAll(async () => {
        await Workout.deleteMany({}); // Clear the database before each test
    });

    it("should create a new workout", async () => {
        const response = await request(app)
            .post("/workouts")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send({
                type: "Morning Cardio",
                duration: 30,
                caloriesBurned: 300,
                exerciseIds: [], // Assuming exerciseIds is optional and can be an empty array
            });

        console.log(response.body); // Log the response body for debugging
        console.log(response.status); // Log the response status for debugging
        console.log(response.body._id);
        console.log(response.body.type); // Log the workout type for debugging

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.type).toBe("Morning Cardio");
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

    // get a workout by id
    it("should retrieve a workout by ID", async () => {
        const workout = await new Workout({
            type: "Morning Cardio",
            duration: 30,
            caloriesBurned: 300,
            exerciseIds: [], // Assuming exerciseIds is optional and can be an empty array
            timestamp: new Date(),
        }).save();

        const response = await request(app).get(`/workouts/${workout._id}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(workout._id.toString());
    });

    // update a workout by id
    it("should update a workout by ID", async () => {
        const workout = await new Workout({
            type: "Morning Cardio",
            duration: 30,
            caloriesBurned: 300,
            exerciseIds: [], // Assuming exerciseIds is optional and can be an empty array
            timestamp: new Date(),
        }).save();

        const response = await request(app)
            .put(`/workouts/${workout._id}`)
            .send({ duration: 45 });

        expect(response.status).toBe(200);
        expect(response.body.duration).toBe(45);
    });

    // delete a workout by id
    it("should delete a workout by ID", async () => {
        const workout = await new Workout({
            type: "Morning Cardio",
            duration: 30,
            caloriesBurned: 300,
            exerciseIds: [], // Assuming exerciseIds is optional and can be an empty array
            timestamp: new Date(),
        }).save();

        const response = await request(app).delete(`/workouts/${workout._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Workout deleted successfully");
    });

    //it("should return 404 if workout not found", async () => {
    //const response = await request(app).get("/workouts/67f4695982f61670c45633an");

    //expect(response.status).toBe(404);
    //expect(response.body.message).toBe("Workout not found");
    //});
    /*it("should return 500 if there is a server error", async () => {
        const response = await request(app).post("/workouts").send({
            type: "Morning Cardio",
            duration: 30,
            caloriesBurned: "three hundred", // Invalid data type for caloriesBurned
            exerciseIds: [], // Assuming exerciseIds is optional and can be an empty array
        });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Error creating workout");
    });*/
});
