import request from "supertest";
import app from "../server";
import { User } from "../models/user";

describe("Users API", () => {
    beforeEach(async () => {
        await User.deleteMany({}); // Clear the database before each test
    });

    it("should create a new user", async () => {
        const response = await request(app)
            .post("/users")
            .send({
                name: "testuser",
                email: "test@yser.com",
                googleId: "1234567890",
                workoutIds: [],
                favoriteExercise: [],
                achievements: [],
            });

        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty("_id");
        expect(response.body.user.name).toBe("testuser");
    }
    );

    it("should retrieve all users", async () => {
        await new User({
            name: "testuser2",
            email: "test2@user.com",
            googleId: "0987654321",
            workoutIds: [],
            favoriteExercise: [],
            achievements: [],
        }).save();

        const response = await request(app).get("/users").redirects(1);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }
    );
});