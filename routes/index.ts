import express from "express";
import authenticationRouter from "./authentication";
import achievementsRouter from "./achievements";
import usersRouter from "./users";
import exercisesRouter from "./exercises";
import metricsRouter from "./health-metrics";
import workoutsRouter from "./workouts";
import { isAuthenticated } from "../controllers/authentication"; // Make sure this is used
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

// Apply the isAuthenticated middleware to specific routes (POST, PUT, DELETE)
router.use("/users", isAuthenticated, usersRouter);
router.use("/workouts", isAuthenticated, workoutsRouter);
router.use("/exercises", isAuthenticated, exercisesRouter);
router.use("/health-metrics", isAuthenticated, metricsRouter);
router.use("/achievements", isAuthenticated, achievementsRouter);

export default router;
