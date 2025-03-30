import request from "supertest";
import app from "../server"; // Assuming your server is exported from the main app file
//import http from "http"; // Import http to create a server instance
import { Achievement } from "../models/achievement";

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
    beforeEach(async () => {
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
});