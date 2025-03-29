/* eslint-disable no-console */
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

//Get entire user by ID
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

export async function getUserProperty(req: Request, res: Response) {
    try {
        const { id, property } = req.params;

        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the property exists on the user object
        if (!(property in user.toObject())) {
            // Ensure the property exists in the user
            return res
                .status(404)
                .json({ message: `Property '${property}' not found.` });
        }

        // Return the property value
        res.json({ [property]: user[property] });
    } catch (error) {
        res.status(500).json({
            message: `Error retrieving property: ${error}`,
        });
    }
}

//Update entire user by ID
export async function updateUserById(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        const updateData = req.body; // Get all fields from the body

        // Attempt to find and update the user document
        const user = await User.findByIdAndUpdate(userId, updateData, {
            new: true, // Return the updated user
            runValidators: true, // Run schema validation
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found in users/updateUserById controller.",
            });
        }

        // Return the updated user document
        res.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            message: `Error updating user: ${error instanceof Error ? error.message : String(error)}`,
        });
    }
}

// Update a specific user property
export const updateUserProperty = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.params.id;
        const property = req.params.property; // E.g., 'email', 'name', etc.
        const value = req.body.value; // The new value for the property

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the property exists on the user model
        if (!(property in user)) {
            return res
                .status(400)
                .json({ message: `Invalid property: ${property}` });
        }

        // Update the user property
        user[property] = value;

        // Save the updated user
        await user.save();

        // Send response
        return res
            .status(200)
            .json({ message: `${property} updated successfully`, user });
    } catch (err) {
        next(err);
    }
};
