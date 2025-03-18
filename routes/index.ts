import express from "express";
import authenticationRouter from "./authentication";
import achievementsRouter from "./achievements";
import usersRouter from "./users";
import exercisesRouter from "./exercises";
import metricsRouter from "./health-metrics";
import workoutsRouter from "./workouts";
import swaggerRouter from "./swagger";

const router = express.Router();

//Authentication
router.use("/authentication", authenticationRouter);

//Users
router.use("/users", usersRouter);

//Workouts
router.use("/workouts", workoutsRouter);

//Exercises
router.use("/exercises", exercisesRouter);

//Health Metrics
router.use("/health-metrics", metricsRouter);

//Achievements
router.use("/achievements", achievementsRouter);

//Swagger
router.use("/api-docs", swaggerRouter);

export default router;
