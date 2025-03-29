import express from "express";
import authenticationRouter from "./authentication";
import achievementsRouter from "./achievements";
import usersRouter from "./users";
import exercisesRouter from "./exercises";
import metricsRouter from "./health-metrics";
import workoutsRouter from "./workouts";
import { isAuthenticated } from "../controllers/authentication"; // Import the isAuthenticated middleware
import swaggerRouter from "./swagger";

const router = express.Router();

// Home route (public, GET)
router.get("/", (req, res) => {
    res.send("Welcome to the Fitness API!");
});

// Authentication route (public, GET)
router.use("/authentication", authenticationRouter);

// Swagger route (public, GET)
router.use("/api-docs", swaggerRouter);

// Apply the isAuthenticated middleware to all non-GET routes globally
router.use((req, res, next) => {
    if (req.method !== "GET") {
        // Apply isAuthenticated middleware to all non-GET routes
        return isAuthenticated(req, res, next);
    }
    next(); // Skip isAuthenticated middleware for GET requests
});

// Register routes
router.use("/users", usersRouter);
router.use("/workouts", workoutsRouter);
router.use("/exercises", exercisesRouter);
router.use("/health-metrics", metricsRouter);
router.use("/achievements", achievementsRouter);

export default router;
