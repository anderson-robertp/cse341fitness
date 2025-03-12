import express, { Request, Response } from "express";
import { createAchievement, getAchievements, deleteAchievement, getAchievementById, updateAchievement } from "../controllers/achievements";

const achievementsRouter = express.Router();

//Create Achievement Route
achievementsRouter.post("/", createAchievement);

//Get Achievements Route
achievementsRouter.get("/", getAchievements);

//GEt Achievement by ID Route
achievementsRouter.get("/:id", getAchievementById);

//Delete Achievement Route
achievementsRouter.delete("/:id", deleteAchievement);

//update Achievement Route
achievementsRouter.put("/:id", updateAchievement);

export default achievementsRouter;