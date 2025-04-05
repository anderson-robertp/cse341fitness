/* eslint-disable no-console */
import { Request, Response, RequestHandler } from "express";
import { Achievement, UserAchievement } from "../models/achievement";
import { User } from "../models/user";

export const createAchievement: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        console.log("Incoming request body:", req.body); //
        console.log("Headers:", req.headers);
        const { title, description, progressGoal } = req.body;
        const achievement = new Achievement({
            title: title,
            description: description,
            progressGoal: progressGoal,
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
        const { title, description, progressGoal } = req.body;

        console.log("Updating achievement with ID:", id);
        console.log("Update body:", req.body);

        const achievement = await Achievement.findById(id);

        if (!achievement) {
            res.status(404).json({ message: "Achievement not found" });
            return;
        }

        if (title !== undefined) achievement.title = title;
        if (description !== undefined) achievement.description = description;
        if (progressGoal !== undefined) achievement.progressGoal = progressGoal;

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
        // Extract userId from route params and achievementId, progress from body
        const { userId } = req.params; // <-- Get from path
        const { achievementId, progress } = req.body;

        // Log incoming data for debugging
        console.log("Creating UserAchievement:", {
            userId,
            achievementId,
            progress,
        });

        // Ensure required fields are present
        if (!achievementId || progress == null) {
            res.status(400).json({
                message: "Missing required fields: achievementId or progress",
            });
            return;
        }

        // Ensure the achievement exists
        const achievement = await Achievement.findById(achievementId);
        if (!achievement) {
            res.status(404).json({ message: "Achievement not found" });
            return;
        }

        // Create the UserAchievement
        const userAchievement = new UserAchievement({
            userId,
            achievementId,
            progress,
        });

        // Save the UserAchievement
        const savedUserAchievement = await userAchievement.save();

        // Update the user's achievements array
        await User.findByIdAndUpdate(userId, {
            $push: { achievements: savedUserAchievement._id },
        });

        // Respond with the created UserAchievement
        res.status(201).json(savedUserAchievement);
    } catch (error) {
        console.error("Error creating user achievement:", error);
        res.status(500).json({
            message: "Error creating user achievement",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
