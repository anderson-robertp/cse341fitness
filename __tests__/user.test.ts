import request from "supertest";
import app from "../server";
import { User } from "../models/user";
import mongoose from "mongoose"; // Import mongoose to create ObjectId for testing

describe("Users API", () => {

    let userId: mongoose.Types.ObjectId; // Store userId for later tests

    /*beforeEach(async () => {
        await User.deleteMany({}); // Clear the database before each test
    });*/
    beforeAll(async () => {
        await User.deleteMany({}); // Clear the database at the start
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

        userId = response.body.user._id; // Store userId for later use
        console.log("Created User ID:", userId); // Log the created user ID for debugging purposes
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

        //console.log("Response: ",response.body.user[0]); // Log the response body for debugging purposes

        //userId = response.body.user[0]._id; // Store userId for later use
        console.log("Perpetuated User ID:", userId); // Log the created user ID for debugging purposes
    });

    it("should retrieve the created user by ID", async () => {
        console.log("User ID for retrieval test:", userId); // Log the userId to ensure it's set before running this test
        // Check if userId is defined before running the test
        expect(userId).toBeDefined(); // Ensure userId is set before running this test

        const response = await request(app).get(`/users/${userId}`);

        console.log("Get User Response:", response.body); // Debugging

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id", userId);
    });

    it("should retrieve a user's email", async () => {
        console.log("User ID for update test:", userId); // Log the userId to ensure it's set before running this test
        // Check if userId is defined before running the test

        expect(userId).toBeDefined(); // Ensure userId is set before running this test

        const response = await request(app).get(`/users/${userId}/email`); // Assuming you have an endpoint to get user email by ID
        console.log("Get User Email Response:", response.body); // Debugging

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("email"); // Check if email property exists in the response
    });

    it("should update the user's name", async () => {
        console.log("User ID for update test:", userId); // Log the userId to ensure it's set before running this test
        // Check if userId is defined before running the test
        expect(userId).toBeDefined(); // Ensure userId is set before running this test

        const response = await request(app)
            .put(`/users/${userId}`) // Assuming you have an endpoint to update user by ID
            .send({ name: "updatedTestUser" });

        console.log("Update User Response:", response.body); // Debugging

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", "updatedTestUser"); // Check if the name was updated correctly
    });
});
