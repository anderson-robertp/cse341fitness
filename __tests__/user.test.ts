import request from "supertest";
import app from "../server";
import { User } from "../models/user";
import mongoose from "mongoose"; // Import mongoose to create ObjectId for testing

describe("Users API", () => {
    beforeEach(async () => {
        await User.deleteMany({}); // Clear the database before each test
    });

    it("should create a new user", async () => {
        const response = await request(app).post("/users").send({
            name: "testuser",
            email: "test@yser.com",
            googleId: "1234567890",
            workoutIds: [],
            favoriteExercise: new mongoose.Types.ObjectId("67d0e2016ab4fc6e4073c80b"),
            achievements: [],
        });

        //console.log(response.body); // Log the response body for debugging purposes

        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty("_id");
        expect(response.body.user.name).toBe("testuser");
    });

    it("should retrieve all users", async () => {
        await new User({
            name: "testuser2",
            email: "test2@user.com",
            googleId: "0987654321",
            workoutIds: [],
            favoriteExercise: new mongoose.Types.ObjectId("67d0e2016ab4fc6e4073c807"), // Assuming favoriteExercise can be an ObjectId of an exercise
            achievements: [],
        }).save();

        const response = await request(app).get("/users").redirects(1);
        
        console.log(response.body); // Log the response body for debugging purposes

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
