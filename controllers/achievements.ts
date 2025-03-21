import { Request, Response, RequestHandler } from "express";
import { Achievement, UserAchievement } from "../models/achievement";

export const createAchievement: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { title, description, progressGoal } = req.body;
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
        const { title, description, progressGoal } = req.body;

        // Find the achievement by ID
        const achievement = await Achievement.findById(id);

        if (!achievement) {
            res.status(404).json({ message: "Achievement not found" });
            return;
        }

        // Update the fields
        achievement.title = title || achievement.title;
        achievement.description = description || achievement.description;
        achievement.progressGoal = progressGoal || achievement.progressGoal;

        // Save the updated achievement
        await achievement.save();

        res.status(200).json({ message: "Achievement has been updated" });
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
        const userAchievements = await UserAchievement.find({ userId });
        res.status(200).json(userAchievements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user achievements" });
    }
};
