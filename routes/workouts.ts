import express from "express";
import {
    createWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
    getWorkoutsByUserId,
} from "../controllers/workout"; // Adjust the import path as necessary

const workoutsRouter = express.Router();

// Create Workout Route
workoutsRouter.post(
    "/",
    createWorkout,
    /*  
    #swagger.tags = ['Workouts']
    #swagger.description = 'Create a new workout'
    #swagger.parameters['body'] = {
        "in": "body",
        "required": true,
        "schema": {
            "type": "object",
            "properties": {
                "type": { "type": "string", "description": "Type of the workout" },
                "duration": { "type": "number", "description": "Duration of the workout in minutes" },
                "caloriesBurned": { "type": "number", "description": "Calories burned during the workout" },
                "exerciseIds": { "type": "array", "items": { "type": "string" }, "description": "Array of exercise IDs associated with the workout" },
                "timestamp": { "type": "string", "format": "date-time", "description": "Timestamp of the workout" }
            },
            "required": ["type", "duration", "caloriesBurned", "timestamp"]
        }
    }
    #swagger.responses[201] = {
        description: 'Workout created successfully.'
    }
    #swagger.responses[500] = {
        description: 'Error creating workout.'
    }
    */
);

// Get All Workouts Route
workoutsRouter.get(
    "/",
    getWorkouts,
    /*  
    #swagger.tags = ['Workouts']
    #swagger.description = 'Retrieve all workouts'
    #swagger.responses[200] = {
        description: 'Workouts retrieved successfully.'
    }
    #swagger.responses[500] = {
        description: 'Error retrieving workouts.'
    }
    */
);

// Get Workout by ID Route
workoutsRouter.get(
    "/:id",
    getWorkoutById,
    /*  
    #swagger.tags = ['Workouts']
    #swagger.description = 'Retrieve a workout by ID'
    #swagger.parameters['id'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the workout"
    }
    #swagger.responses[200] = {
        description: 'Workout retrieved successfully.'
    }
    #swagger.responses[404] = {
        description: 'Workout not found.'
    }
    #swagger.responses[500] = {
        description: 'Error retrieving workout.'
    }
    */
);

// Get Workouts by User ID Route
workoutsRouter.get(
    "/user/:userId",
    getWorkoutsByUserId,

    /*  
    #swagger.tags = ['Workouts']
    #swagger.description = 'Retrieve workouts by user ID'
    #swagger.parameters['userId'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the user"
    }
    #swagger.responses[200] = {
        description: 'Workouts retrieved successfully.'
    }
    #swagger.responses[404] = {
        description: 'No workouts found for the given user.'
    }
    #swagger.responses[500] = {
        description: 'Error retrieving workouts.'
    }
    */
);

// Update Workout by ID Route
workoutsRouter.put(
    "/:id",
    updateWorkout,
    /*  
    #swagger.tags = ['Workouts']
    #swagger.description = 'Update an existing workout'
    #swagger.parameters['id'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the workout"
    }
    #swagger.parameters['body'] = {
        "in": "body",
        "required": true,
        "schema": {
            "type": "object",
            "properties": {
                "type": { "type": "string", "description": "Type of the workout" },
                "duration": { "type": "number", "description": "Duration of the workout in minutes" },
                "caloriesBurned": { "type": "number", "description": "Calories burned during the workout" },
                "exerciseIds": { "type": "array", "items": { "type": "string" }, "description": "Array of exercise IDs associated with the workout" },
                "timestamp": { "type": "string", "format": "date-time", "description": "Timestamp of the workout" }
            },
            "required": ["type", "duration", "caloriesBurned", "timestamp"]
        }
    }
    #swagger.responses[200] = {
        description: 'Workout updated successfully.'
    }
    #swagger.responses[404] = {
        description: 'Workout not found.'
    }
    #swagger.responses[500] = {
        description: 'Error updating workout.'
    }
    */
);

// Delete Workout by ID Route
workoutsRouter.delete(
    "/:id",
    deleteWorkout,
    /*  
    #swagger.tags = ['Workouts']
    #swagger.description = 'Delete a workout by ID'
    #swagger.parameters['id'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the workout"
    }
    #swagger.responses[200] = {
        description: 'Workout deleted successfully.'
    }
    #swagger.responses[404] = {
        description: 'Workout not found.'
    }
    #swagger.responses[500] = {
        description: 'Error deleting workout.'
    }
    */
);

export default workoutsRouter;
