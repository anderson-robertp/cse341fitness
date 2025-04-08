import request from "supertest";
import app from "../server";
import { User } from "../models/user";
import mongoose from "mongoose"; // Import mongoose to create ObjectId for testing
import e from "express";

describe("Users API", () => {
    let userId: mongoose.Types.ObjectId; // Store userId for later tests

    /*beforeEach(async () => {
        await User.deleteMany({}); // Clear the database before each test
    });*/
    beforeAll(async () => {
        await User.deleteMany({}); // Clear the database at the start
    });

    it("should create a new user", async () => {
        const response = await request(app)
            .post("/users")
            .send({
                name: "testuser",
                email: "test@yser.com",
                googleId: "1234567890",
                workoutIds: [],
                favoriteExercise: new mongoose.Types.ObjectId(
                    "67d0e2016ab4fc6e4073c80b",
                ),
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
            favoriteExercise: new mongoose.Types.ObjectId(
                "67d0e2016ab4fc6e4073c807",
            ), // Assuming favoriteExercise can be an ObjectId of an exercise
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

    it("should update the user by ID", async () => {
        console.log("User ID for update test:", userId); // Log the userId to ensure it's set before running this test
        expect(userId).toBeDefined(); // Ensure userId is set before running this test
        const response = await request(app)
        .put(`/users/${userId}/favoriteExercise`)
        .set("Content-Type", "application/json")
        .send({
            name: "testuser",
            email: "updateduser@test.com",
            workoutIds: [],
            favoriteExercise: new mongoose.Types.ObjectId(
                "67d0e2016ab4fc6e4073c80b",
            ),
        }); // Assuming you have an endpoint to update user by ID
        console.log("Update User Response:", response.body); // Debugging

        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.body).toHaveProperty("message", "favoriteExercise updated successfully"); // Check if the message indicates successful update
        expect(response.body).toHaveProperty("user"); // Check if the user property exists in the response
        expect(response.body.user).toHaveProperty("_id", userId); // Check if the user ID matches the updated user ID
    });
    
    it("shoule delete the user by ID", async () => {
        console.log("User ID for deletion test:", userId); // Log the userId to ensure it's set before running this test
        // Check if userId is defined before running the test
        expect(userId).toBeDefined(); // Ensure userId is set before running this test

        const response = await request(app).delete(`/users/${userId}`); // Assuming you have an endpoint to delete user by ID

        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.body).toHaveProperty(
            "message",
            "User deleted successfully.",
        ); // Check if the message indicates successful deletion
    }); // Test deleting a user by ID

    it("should return 404 for deleted user", async () => {
        const response = await request(app).get(`/users/${userId}`); // Attempt to retrieve the deleted user

        expect(response.status).toBe(404); // Check if the response status is 404 (Not Found)
        expect(response.body).toHaveProperty("message", "User not found in users/getUserById controller."); // Check if the message indicates user not found
    });

    /*it("should return 404 for non-existent user", async () => {
        const nonExistentId = new mongoose.Types.ObjectId(); // Generate a new ObjectId for testing
        const response = await request(app).get(`/users/${nonExistentId}`); // Attempt to retrieve a non-existent user

        expect(response.status).toBe(404); // Check if the response status is 404 (Not Found)
        expect(response.body).toHaveProperty("message", "User not found in users/getUserById controller."); // Check if the message indicates user not found
    });
    it("should return 404 for non-existent user email", async () => {
        const nonExistentId = new mongoose.Types.ObjectId(); // Generate a new ObjectId for testing
        const response = await request(app).get(`/users/${nonExistentId}/email`); // Attempt to retrieve a non-existent user email

        expect(response.status).toBe(404); // Check if the response status is 404 (Not Found)
        expect(response.body).toHaveProperty("message", "User not found in users/getUserEmailById controller."); // Check if the message indicates user not found
    });*/
});
