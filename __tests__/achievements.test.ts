import request from "supertest";
import app from "../server"; // Assuming your server is exported from the main app file
//import http from "http"; // Import http to create a server instance
import { Achievement,UserAchievement } from "../models/achievement";
import { User } from "../models/user";
import mongoose from "mongoose"; // Import mongoose to create ObjectId for testing
import e from "express";
//import e from "express";

//jest.mock("../models/user"); // Mock the User model to avoid database calls during tests
//jest.mock("../models/achievement"); // Mock the Achievement model to avoid database calls during tests


/*let server: http.Server;

beforeAll(() => {
    server = app.listen(3000);  // Start the server before tests
});

afterAll(() => {
    server.close();  // Close the server after tests
});

// Mock the authenticate middleware to skip authentication during tests
jest.mock("../server", () => ({
    authenticate: (req: any, res: any, next: any) => next(), // Skip authentication
}));
*/
describe("Achievements API", () => {
    beforeAll(async () => {
        // Initialize in-memory database or connect to test database
        //await InitializeInMemoryDatabase(); // Uncomment if using in-memory database
        //console.log("In-memory database initialized.");
        await Achievement.deleteMany({}); // Clear the database before each test
    });

    it("should create a new achievement", async () => {
        const response = await request(app).post("/achievements").send({
            title: "First Quest",
            description: "Complete your first workout",
            progressGoal: 1,
        });

        console.log("Response Body:", response.body); // Log the response body for debugging

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.title).toBe("First Quest");
    });

    it("should retrieve all achievements", async () => {
        await new Achievement({
            title: "Test",
            description: "Sample",
            progressGoal: 10,
        }).save();
        const response = await request(app).get("/achievements").redirects(1);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("should retrieve a specific achievement by ID", async () => {
        // Create a sample achievement to retrieve
        const achievement = await new Achievement({
            title: "Second Quest",
            description: "Complete your second workout",
            progressGoal: 2,
        }).save();

        const response = await request(app).get(`/achievements/${achievement._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.title).toBe("Second Quest");
    });

    it("should update an existing achievement", async () => {
        // Create a sample achievement to update
        const achievement = await new Achievement({
            title: "Third Quest",
            description: "Complete your third workout",
            progressGoal: 3,
        }).save();

        const response = await request(app).put(`/achievements/${achievement._id}`).send({
            title: "Updated Third Quest",   // Update the title'
            description: "Complete your third workout - Updated",
            progressGoal: 5, // Update the progress goal);
        });

        console.log("Update Response Body:", response.body); // Log the response body for debugging

        expect(response.status).toBe(200);
        expect(response.body.achievement).toHaveProperty("_id");
        expect(response.body.achievement.title).toBe("Updated Third Quest"); // Check for updated title
        expect(response.body.achievement.progressGoal).toBe(5); // Check for updated progress goal
    });

    it("should delete an achievement", async () => {
        // Create a sample achievement to delete
        const achievement = await new Achievement({
            title: "Fourth Quest",
            description: "Complete your fourth workout",
            progressGoal: 4,
        }).save();

        const response = await request(app).delete(`/achievements/${achievement._id}`);

        console.log("Delete Response Body:", response.body); // Log the response body for debugging

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Achievement deleted successfully");
    });

    it("create user achievement and verify it", async () => {
        // Create a sample achievement to link to user
        const response = await request(app).post("/achievements").send({
            title: "Fifth Quest",
            description: "Complete your fifth workout",
            progressGoal: 5,
        });

        console.log("Create Achievement Response Body:", response.body); // Log the response body for debugging
        
        expect(response.status).toBe(201); // Ensure the achievement was created successfully
        
        const achievementId = response.body._id; // Get the created achievement ID
        
        console.log("Created Achievement ID:", achievementId); // Log for debugging
        
        const userResponse = await request(app)
            .post("/users")
            .send({
                name: "testuser",
                email: "test@user.com",
                googleId: "1234567890",
                workoutIds: [],
                favoriteExercise: new mongoose.Types.ObjectId(
                    "67d0e2016ab4fc6e4073c80b",
                ),
                achievements: [achievementId],
            });
        const userId = userResponse.body.user._id; // Get the created user ID for further verification
        expect(userResponse.status).toBe(201);
        console.log("User Response Body:", userResponse.body); // Log the response body for debugging
        console.log("Created User ID:", userResponse.body.user._id); // Log for debugging
        expect(userResponse.body.user._id).toBe(userId);
        expect(userResponse.body.user.name).toBe("testuser");
        expect(userResponse.body.user.achievements).toContain(achievementId.toString()); // Ensure the user has the achievement linked
        // Verify the user achievement was created and linked correctly
        
        
        const userAchievementsResponse = await request(app).get(`/users/${userId}/achievements`);
        console.log("User Achievements Response Body:", userAchievementsResponse.body); // Log the response body for debugging

        expect(userAchievementsResponse.status).toBe(200); // Ensure we can retrieve user achievements
        expect(Array.isArray(userAchievementsResponse.body.achievements)).toBe(true); // Ensure the response is an array
    });

    /*it("show a 404 error when trying to retrieve a non-existing achievement", async () => {
        const nonExistingId = new mongoose.Types.ObjectId(); // Generate a random ObjectId
        const response = await request(app).get(`/achievements/${nonExistingId}`);
        console.log("404 Error Response Body:", response.body); // Log the response body for debugging

        expect(response.status).toBe(404); // Expect a 404 status code
        expect(response.body.message).toBe("Achievement not found"); // Expect a specific error message
    }
    );

    it("should return 400 error for invalid achievement ID", async () => {
        const invalidId = "invalidId"; // Invalid ID format
        const response = await request(app).get(`/achievements/${invalidId}`);
        console.log("Invalid ID Error Response Body:", response.body); // Log the response body for debugging

        expect(response.status).toBe(400); // Expect a 400 status code
        expect(response.body.message).toBe("Invalid achievement ID"); // Expect a specific error message
    });
    it("should return 400 error for invalid user ID", async () => {
        const invalidId = "invalidId"; // Invalid ID format
        const response = await request(app).get(`/users/${invalidId}/achievements`);
        console.log("Invalid User ID Error Response Body:", response.body); // Log the response body for debugging

        expect(response.status).toBe(400); // Expect a 400 status code
        expect(response.body.message).toBe("Invalid user ID"); // Expect a specific error message
    });

    it("should return 500 error for server error", async () => {
        // Simulate a server error by passing an invalid achievement ID format
        const invalidId = "invalidId"; // Invalid ID format
        const response = await request(app).get(`/achievements/${invalidId}`);
        console.log("Server Error Response Body:", response.body); // Log the response body for debugging
        expect(response.status).toBe(500); // Expect a 500 status code
    });*/
});
