import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

export async function getUserById(req: Request, res: Response) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found in users/getUserById controller.",
            });
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({
            message: `Error getting user in users/getUserById controller: ${error}`,
        });
    }
}

export async function updateUserById(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        const { name, email, workoutIds, favoriteExercise } = req.body;

        const user = await User.findByIdAndUpdate(userId, {
            name: name,
            email: email,
            workoutIds: workoutIds,
            favoriteExercise: favoriteExercise,
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found in users/updateUserById controller.",
            });
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({
            message: `Error updating user in users/updateUserById controller: ${error}`,
        });
    }
}
