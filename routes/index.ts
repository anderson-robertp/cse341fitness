import express from "express";
import authenticationRouter from "./authentication";
import achievementsRouter from "./achievements";
import usersRouter from "./users";
import exercisesRouter from "./exercises";
import metricsRouter from "./health-metrics";
import workoutsRouter from "./workouts";
import { isAuthenticated } from "../controllers/authentication"; // Import the isAuthenticated middleware
import swaggerRouter from "./swagger";
import userMetricsRouter from "./user-health-metrics";

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
router.use(
    "/users",
    isAuthenticated,
    usersRouter,
    /*
    #swagger.security = 
        - oauth2: ["opendid", "profile", "email"]
    */
);
router.use("/workouts", workoutsRouter);
router.use("/exercises", exercisesRouter);
router.use(
    "/health-metrics",
    isAuthenticated,
    metricsRouter,
    /*
    #swagger.security = 
        - oauth2: ["opendid", "profile", "email"]
    */
);
router.use("/achievements", achievementsRouter);
router.use("/user-health-metrics", userMetricsRouter); // User-specific health metrics

export default router;
