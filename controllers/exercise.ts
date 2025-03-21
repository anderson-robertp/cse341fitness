import { RequestHandler } from "express";
import { Exercise } from "../models/exercise";

// Create a new exercise
export const createExercise: RequestHandler = async (req, res) => {
    try {
        const newExercise = new Exercise(req.body);
        await newExercise.save();
        res.status(201).json(newExercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating exercise", error });
    }
};

// Get all exercises
export const getExercises: RequestHandler = async (_req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching exercises", error });
    }
};

// Get an exercise by ID
export const getExerciseById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Exercise.findById(id);

        if (!exercise) {
            res.status(404).json({ message: "Exercise not found" });
            return;
        }

        res.status(200).json(exercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching exercise", error });
    }
};

// Update an exercise by ID  
export const updateExercise: RequestHandler = async (req, res): Promise<void> => {   
    try {
        const { id } = req.params;
        const updatedExercise = await Exercise.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedExercise) {
            res.status(404).json({ message: "Exercise not found" });
            return;
        }

        res.status(200).json(updatedExercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Failed to update exercise",  
            error: error instanceof Error ? error.message : String(error) 
        });
    }
};

// Delete an exercise by ID
export const deleteExercise: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedExercise = await Exercise.findByIdAndDelete(id);

        if (!deletedExercise) {
            res.status(404).json({ message: "Exercise not found" });
            return;
        }

        res.status(200).json({ message: "Exercise deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Failed to delete exercise",  
            error: error instanceof Error ? error.message : String(error) 
        });
    }
};
