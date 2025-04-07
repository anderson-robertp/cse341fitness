/* eslint-disable no-console */
import { Request, Response, RequestHandler } from "express";
import { Achievement, UserAchievement } from "../models/achievement";
import { User } from "../models/user";

export const createAchievement: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        console.log("Incoming request body:", req.body);
        console.log("Headers:", req.headers);

        const { title, description } = req.body;
        let { progressGoal } = req.body;

        // Reject empty string or invalid progressGoal before conversion
        if (progressGoal === "") {
            res.status(400).json({
                message: "progressGoal cannot be an empty string.",
            });
            return;
        }

        // Auto-convert string to number if necessary
        if (typeof progressGoal === "string") {
            progressGoal = Number(progressGoal);
        }

        const isInvalidProgressGoal =
            progressGoal === undefined ||
            progressGoal === null ||
            typeof progressGoal !== "number" ||
            isNaN(progressGoal); // Check after conversion

        if (!title || !description || isInvalidProgressGoal) {
            res.status(400).json({
                message:
                    "Title, description, and progressGoal are required, and progressGoal must be a valid number.",
            });
            return;
        }

        const achievement = new Achievement({
            title,
            description,
            progressGoal,
        });

        await achievement.save();
        res.status(201).json(achievement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating achievement" });
    }
};

export const getAchievements: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const achievements = await Achievement.find();
        res.status(200).json(achievements); // Call res directly instead of returning it
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching achievements" });
    }
};

export const getAchievementById: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const achievement = await Achievement.findById(id);
        if (!achievement) {
            res.status(404).json({ message: "Achievement not found" });
            return;
        }
        res.status(200).json(achievement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching achievement" });
    }
};

export const updateAchievement: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        let { progressGoal } = req.body;

        console.log("Updating achievement with ID:", id);
        console.log("Update body:", req.body);

        const achievement = await Achievement.findById(id);

        if (!achievement) {
            res.status(404).json({ message: "Achievement not found" });
            return;
        }

        // Validation for progressGoal
        if (progressGoal !== undefined) {
            if (progressGoal === "") {
                res.status(400).json({
                    message: "progressGoal cannot be an empty string.",
                });
                return;
            }
            if (typeof progressGoal === "string") {
                progressGoal = Number(progressGoal);
            }

            const isInvalidProgressGoal =
                progressGoal === undefined ||
                progressGoal === null ||
                typeof progressGoal !== "number" ||
                isNaN(progressGoal);

            if (isInvalidProgressGoal) {
                res.status(400).json({
                    message: "progressGoal must be a valid number.",
                });
                return;
            }
            achievement.progressGoal = progressGoal;
        }

        if (title !== undefined) achievement.title = title;
        if (description !== undefined) achievement.description = description;

        await achievement.save();

        res.status(200).json({
            message: "Achievement has been updated",
            achievement,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating achievement" });
    }
};

export const deleteAchievement: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const achievement = await Achievement.findByIdAndDelete(id);
        if (achievement) {
            res.status(200).json({
                message: "Achievement deleted successfully",
            });
        } else {
            res.status(404).json({ message: "Achievement not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting achievement" });
    }
};

export const getUserAchievements: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { userId } = req.params;
        const userAchievements = await UserAchievement.find({
            userId,
        }).populate("achievementId"); // Populate to get the full achievement data
        res.status(200).json(userAchievements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user achievements" });
    }
};

export const createUserAchievement: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { userId } = req.params;
        let { title, description, progress } = req.body;

        console.log("Creating UserAchievement:", {
            userId,
            title,
            description,
            progress,
        });

        // Ensure the achievement exists or create it if it doesn't
        let achievement = await Achievement.findOne({ title, description });
        if (!achievement) {
            achievement = new Achievement({ title, description });
            await achievement.save();
        }

        // Validation for progress
        if (progress === "") {
            res.status(400).json({
                message: "progress cannot be an empty string.",
            });
            return;
        }

        if (typeof progress === "string") {
            progress = Number(progress);
        }

        const isInvalidProgress =
            progress === undefined ||
            progress === null ||
            typeof progress !== "number" ||
            isNaN(progress);

        if (isInvalidProgress) {
            res.status(400).json({
                message: "progress must be a valid number.",
            });
            return;
        }

        // Create the UserAchievement record
        const userAchievement = new UserAchievement({
            userId,
            achievementId: achievement._id,
            progress,
        });

        await userAchievement.save();

        // Update the user's achievements array
        await User.findByIdAndUpdate(userId, {
            $push: { achievements: userAchievement._id },
        });

        res.status(201).json(userAchievement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user achievement" });
    }
};
