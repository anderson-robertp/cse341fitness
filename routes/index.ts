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

// Swagger route (public, GET)
router.use("/api-docs", swaggerRouter);

// Home route (public, GET)
router.get("/", (req, res) => {
    res.send("Welcome to the Fitness API!");
});

// Authentication route (public, GET)
router.use("/authentication", authenticationRouter);

// Register routes
router.use("/users", isAuthenticated, usersRouter);
router.use("/workouts", workoutsRouter);
router.use("/exercises", exercisesRouter);
router.use("/health-metrics", metricsRouter);
router.use("/achievements", achievementsRouter);

//This route is for debugging only, Delete me if you see me in the repository
router.get("/api/debug-session", (req, res) => {
    console.log("Session Data:", req.session);
    console.log("User Data:", req.user);
    res.json({
        session: req.session,
        user: req.user,
        isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false,
    });
});

export default router;
