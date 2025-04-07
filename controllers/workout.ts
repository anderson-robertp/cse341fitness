import { Request, Response } from "express";
import { Workout } from "../models/workout";

//Create a new workout
export const createWorkout = async (req: Request, res: Response) => {
    try {
        const newWorkout = new Workout(req.body);
        const timestamp = new Date();
        newWorkout.timestamp = timestamp; // Set the current timestamp
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating workout", error });
    }
};

//get all workouts
export const getWorkouts = async (req: Request, res: Response) => {
    try {
        const workouts = await Workout.find();
        res.status(200).json(workouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching workouts", error });
    }
};

//get a workout by id
export const getWorkoutById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const workout = await Workout.findById(id);

        if (!workout) {
            res.status(404).json({ message: "Workout not found" });
            return;
        }

        res.status(200).json(workout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching workout", error });
    }
};

//update a workout by id
export const updateWorkout = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedWorkout) {
            res.status(404).json({ message: "Workout not found" });
            return;
        }
        res.status(200).json(updatedWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating workout", error });
    }
};

//Delete a workout by id
export const deleteWorkout = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedWorkout = await Workout.findByIdAndDelete(id);
        if (!deletedWorkout) {
            res.status(404).json({ message: "Workout not found" });
            return;
        }
        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting workout", error });
    }
};

//Get workouts by user ID
export const getWorkoutsByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const workouts = await Workout.find({ userId });
        res.status(200).json(workouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching workouts by user ID",
            error,
        });
    }
};
