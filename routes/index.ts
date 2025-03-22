import express from "express";
import authenticationRouter from "./authentication";
import achievementsRouter from "./achievements";
import usersRouter from "./users";
import exercisesRouter from "./exercises";
import metricsRouter from "./health-metrics";
import workoutsRouter from "./workouts";
import { isAuthenticated } from "../controllers/authentication";
import swaggerRouter from "./swagger";

const router = express.Router();

//Authentication
router.use("/authentication", authenticationRouter);

//Users
router.use("/users", isAuthenticated, usersRouter);

//Workouts
router.use("/workouts", isAuthenticated, workoutsRouter);

//Exercises
router.use("/exercises", isAuthenticated, exercisesRouter);

//Health Metrics
router.use("/health-metrics", isAuthenticated, metricsRouter);

//Achievements
router.use("/achievements", isAuthenticated, achievementsRouter);

//Swagger
router.use("/api-docs", swaggerRouter);

export default router;
