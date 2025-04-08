/* eslint-disable no-console */
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import mongoose from "mongoose"; // Import mongoose for ObjectId validation

//Get entire user by ID
export async function getUserById(req: Request, res: Response) {
    try {
        const userId = req.params.id; // Extract the user ID from the request parameters

        // Validate the ID parameter from the request
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required in users/getUserById controller.",
            });
        }
        // Check if the provided ID is a valid MongoDB ObjectId format
        // This is optional but can help avoid unnecessary database queries
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message:
                    "Invalid User ID format in users/getUserById controller.",
            });
        }

        const userIdObject = new mongoose.Types.ObjectId(userId); // Create a new ObjectId instance for validation

        // Attempt to find the user by ID using Mongoose's findById method
        const user = await User.findById(userIdObject);
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
        let value = req.body.value; // The new value for the property

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
        if (property === "email" || property === "name" || property === "googleId") {
            // can't update email to existing email
            return res
                .status(400)
                .json({ message: `Invalid property: ${property}` });
        }

        // Update the property
        if (property === "favoriteExercise") {
            // Convert string to ObjectId if necessary
            if (typeof value === "string") {
                value = new mongoose.Types.ObjectId(value);
            }
        
            // Set the property to the ObjectId (or original object if already one)
            user[property] = value;
        } else if (property === "workoutIds" || property === "achievements") {
            if (!Array.isArray(user[property])) {
                user[property] = [];
            }
        
            // Convert to ObjectId if value is a string
            if (typeof value === "string") {
                value = new mongoose.Types.ObjectId(value);
            }
        
            // Avoid pushing duplicates (optional)
            const exists = user[property].some(
                (id: mongoose.Types.ObjectId) => id.toString() === value.toString()
            );
        
            if (!exists) {
                user[property].push(value);
            }
        } else {
            return res
                .status(400)
                .json({ message: `Invalid property: ${property}` });
        }
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

// Create a new user
export async function createUser(req: Request, res: Response) {
    try {
        const newUser = req.body; // Get all fields from the body

        // Create a new user document
        const user = new User(newUser);

        // Save the user to the database
        await user.save();

        // Return the created user document with status 201
        res.status(201).json({ user });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            message: `Error creating user: ${error instanceof Error ? error.message : String(error)}`,
        });
    }
}

// Delete a user by ID
export async function deleteUserById(req: Request, res: Response) {
    try {
        const userId = req.params.id;

        // Attempt to find and delete the user document
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found in users/deleteUserById controller.",
            });
        }

        // Return success message
        res.json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            message: `Error deleting user: ${error instanceof Error ? error.message : String(error)}`,
        });
    }
}

// Rerieve all users (Admin or Public Access)
export async function getAllUsers(req: Request, res: Response) {
    try {
        // Retrieve all users from the database
        const users = await User.find({});

        // Return the list of users
        res.status(200).json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        return res.status(500).json({
            message: `Error retrieving users: ${error instanceof Error ? error.message : String(error)}`,
        });
    }
}

// Note: The above functions assume that the User model is already defined and imported from the models/user file.
