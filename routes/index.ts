import express from "express";
import authenticationRouter from "./authentication";
import achievementsRouter from "./achievements";
import usersRouter from "./users";
import exercisesRouter from "./exercises";
//import metricsRouter from "./health-metrics";
import workoutsRouter from "./workouts";
import { isAuthenticated } from "../controllers/authentication"; // Import the isAuthenticated middleware
import swaggerRouter from "./swagger";
import userMetricsRouter from "./user-health-metrics";
import { Request, Response, NextFunction } from "express";
import env from "dotenv";

env.config();

const router = express.Router();

// Swagger route (public, GET)
router.use("/api-docs", swaggerRouter);

// Home route (public, GET)
router.get("/", (req, res) => {
    res.send("Welcome to the Fitness API!");
});

// Authentication route (public, GET)
router.use("/authentication", authenticationRouter);

// Protect non-GET routes globally before applying routes
router.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Request method: ${req.method}`); // Log the method
    if (req.method === "GET") {
        return next(); // Allow GET requests for everyone
    }
    if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev") {
        console.log("Skipping authentication in test environment. Server.ts"); // Log to indicate we're skipping authentication in test environment
        return next(); // Skip authentication for test environment
    }

    if (req.isAuthenticated()) {
        return next(); // Allow non-GET requests if user is authenticated
    }

    // If the user is not authenticated and is trying a non-GET request
    res.status(401).json({ message: "Unauthorized: Please log in first." });
});

// Register routes
router.use(
    "/users",
    isAuthenticated,
    usersRouter,
    /*
    #swagger.security = 
        - SessionAuth: []
    */
);
router.use("/workouts", workoutsRouter);
router.use("/exercises", exercisesRouter);
router.use("/achievements", achievementsRouter);
router.use("/user-health-metrics", userMetricsRouter); // User-specific health metrics

export default router;
