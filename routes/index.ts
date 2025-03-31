import express from "express";
import authenticationRouter from "./authentication";
import achievementsRouter from "./achievements";
import usersRouter from "./users";
import exercisesRouter from "./exercises";
import metricsRouter from "./health-metrics";
import workoutsRouter from "./workouts";
import swaggerRouter from "./swagger";

const router = express.Router();

// Swagger route (public, GET)
router.use("/api-docs", swaggerRouter);

// Home route (public, GET)
router.get("/", async (req, res) => {
    res.send("Welcome to the Fitness API!");
});

// Authentication route (public, GET)
router.use("/authentication", authenticationRouter);

// Register routes
router.use("/users", usersRouter);
router.use("/workouts", workoutsRouter);
router.use("/exercises", exercisesRouter);
router.use("/health-metrics", metricsRouter);
router.use("/achievements", achievementsRouter);

export default router;
