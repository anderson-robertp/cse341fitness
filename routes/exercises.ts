import express from "express";
import {
    createExercise,
    getExercises,
    getExerciseById,
    updateExercise,
    deleteExercise,
} from "../controllers/exercise";
import handleErrors from "../utilities";
import { isAuthenticated } from "../controllers/authentication";

const exercisesRouter = express.Router();

// Create Exercise Route
exercisesRouter.post(
    "/",
    isAuthenticated,
    handleErrors(createExercise),
    /*
    #swagger.tags = ['Exercises']   
    #swagger.description = 'Create a new exercise'
    #swagger.security = 
        - SessionAuth: []
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    "properties": { 
                        "name": { "type": "string", "example": "Pushups" },
                        "type": { "type": "string", "example": "strength"},
                        "duration": { "type": "number", "example": "50" },
                        "sets": { "type": "number", "example": "3" },
                        "reps": { "type": "number", "example": "10" },
                        "weight": { "type": "number", "example": "0" },
                        "caloriesBurned": { "type": "number", "example": 200 },
                    },
                    "required": ["name", "type", "caloriesBurned"],
                }
            }
        }
    }
    #swagger.responses[201] = {
        description: 'Exercise created successfully.'
    }
    #swagger.responses[500] = {
        description: 'Error creating exercise.'
    }
    */
);

// Get Exercises Route
exercisesRouter.get(
    "/",
    handleErrors(getExercises),
    /*
    #swagger.tags = ['Exercises']   
    #swagger.description = 'Retrieve all exercises'
    #swagger.responses[200] = {
        description: 'Exercises retrieved successfully.'
    }
    #swagger.responses[500] = {
        description: 'Error retrieving exercises.'
    }
    */
);

// Get Exercise by ID Route
exercisesRouter.get(
    "/:id",
    handleErrors(getExerciseById),
    /*
    #swagger.tags = ['Exercises']
    #swagger.description = 'Retrieve an exercise by ID';
    #swagger.parameters['id'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the exercise"
    }
    #swagger.responses[200] = {     
        description: 'Exercise retrieved successfully.'
    }
    #swagger.responses[404] = { 
        description: 'Exercise not found.'
    }
    #swagger.responses[500] = { 
        description: 'Error retrieving exercise.'
    }
    */
);

//update exercise by id
exercisesRouter.put(
    "/:id",
    isAuthenticated,
    handleErrors(updateExercise),
    /*
    #swagger.tags = ['Exercises']       
    #swagger.description = 'Update an exercise by ID'
    #swagger.security = 
    - SessionAuth: []
    #swagger.parameters['id'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the exercise"
    }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    "properties": { 
                        "name": { "type": "string", "example": "Pushups" },
                        "type": { "type": "string", "example": "strength"},
                        "duration": { "type": "number", "example": "50" },
                        "sets": { "type": "number", "example": "3" },
                        "reps": { "type": "number", "example": "10" },
                        "weight": { "type": "number", "example": "0" },
                        "caloriesBurned": { "type": "number", "example": 200 },
                    },
                    "required": ["name", "type", "caloriesBurned"],
                }
            }
        }
    }
    #swagger.responses[200] = {     
        description: 'Exercise updated successfully.'
    }
    #swagger.responses[404] = {     
        description: 'Exercise not found.'
    }
    #swagger.responses[500] = {     
        description: 'Error updating exercise.'
    }
    */
);

// Delete Exercise by ID Route
exercisesRouter.delete(
    "/:id",
    isAuthenticated,
    handleErrors(deleteExercise),
    /*
    #swagger.tags = ['Exercises']   
    #swagger.description = 'Delete an exercise by ID'
    #swagger.security = 
    - SessionAuth: []
    #swagger.parameters['id'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the exercise"
    }
    #swagger.responses[200] = { 
        description: 'Exercise deleted successfully.'
    }
    #swagger.responses[404] = {     
        description: 'Exercise not found.'
    }
    #swagger.responses[500] = {     
        description: 'Error deleting exercise.'
    }
    */
);

export default exercisesRouter;
