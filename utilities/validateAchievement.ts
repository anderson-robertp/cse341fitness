import { Request, Response, NextFunction } from "express";

// Middleware to validate required fields
const validateAchievementFields = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    // This must remain void
    const { title, description, progressGoal } = req.body;

    // Check for empty or missing fields
    if (!title || title.trim() === "") {
        res.status(400).json({
            message: "Title is required and cannot be empty.",
        });
        return; // End execution here if validation fails
    }

    if (!description || description.trim() === "") {
        res.status(400).json({
            message: "Description is required and cannot be empty.",
        });
        return; // End execution here if validation fails
    }

    if (
        progressGoal === undefined ||
        progressGoal === null ||
        progressGoal.trim() === "" ||
        isNaN(Number(progressGoal)) ||
        Number(progressGoal) <= 0
    ) {
        res.status(400).json({
            message: "ProgressGoal is required and must be a positive number.",
        });
        return;
    }

    next();
};

export default validateAchievementFields;
