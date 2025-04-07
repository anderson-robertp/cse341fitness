import express from "express";
import {
    createWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
    getWorkoutsByUserId,
} from "../controllers/workout"; // Adjust the import path as necessary
import handleErrors from "../utilities";
import { isAuthenticated } from "../controllers/authentication";

const workoutsRouter = express.Router();

// Create Workout Route
workoutsRouter.post(
    "/",
    isAuthenticated,
    handleErrors(createWorkout),
    /*  
    #swagger.tags = ['Workouts']
    #swagger.description = 'Create a new workout'
    #swagger.security = 
        - oauth2: ["opendid", "profile", "email"]
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    "properties": { 
                        "type": { "type": "string", "example": "strength"},
                        "duration": { "type": "number", "example": "50" },
                        "caloriesBurned": { "type": "number", "example": 200 },
                        "exerciseIds": {
                            type: "array",
                            items: { type: "string" },
                            example: ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"],
                        },
                    },
                    "required": ["type", "duration", "caloriesBurned"],
                }
            }
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
    handleErrors(getWorkouts),
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
    handleErrors(getWorkoutById),
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
    "/user/:id",
    isAuthenticated,
    handleErrors(getWorkoutsByUserId),

    /*  
    #swagger.tags = ['Workouts']
    #swagger.description = 'Retrieve workouts by user ID'
    #swagger.security = 
        - oauth2: ["opendid", "profile", "email"]
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
    isAuthenticated,
    handleErrors(updateWorkout),
    /*  
    #swagger.tags = ['Workouts']
    #swagger.description = 'Update an existing workout'
    #swagger.security = 
        - oauth2: ["opendid", "profile", "email"]
    #swagger.parameters['id'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the workout"
    }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    "properties": { 
                        "type": { "type": "string", "example": "strength"},
                        "duration": { "type": "number", "example": "50" },
                        "caloriesBurned": { "type": "number", "example": 200 },
                        "exerciseIds": {
                            type: "array",
                            items: { type: "string" },
                            example: ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"],
                        },
                    },
                    "required": ["type", "duration", "caloriesBurned"],
                }
            }
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
    isAuthenticated,
    handleErrors(deleteWorkout),
    /*  
    #swagger.tags = ['Workouts']
    #swagger.description = 'Delete a workout by ID'
    #swagger.security = 
        - oauth2: ["opendid", "profile", "email"]
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
