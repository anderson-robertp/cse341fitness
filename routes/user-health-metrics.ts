import express from "express";
//import { Request, Response } from "express";
import {
    getUserHealthMetrics,
    getLatestUserHealthMetrics,
    addUserHealthMetric,
    deleteUserHealthMetric,
    getAllUserHealthMetrics, // Added for admin route to get all health metrics
} from "../controllers/user-health-metrics";
import handleErrors from "../utilities";
import { isAuthenticated } from "../controllers/authentication";

const userMetricsRouter = express.Router();

// Routes
// Get all health metrics (Admin route)
userMetricsRouter.get(
    "/all",
    handleErrors(getAllUserHealthMetrics),
    /*
        #swagger.tags = ['User Health Metrics'],
        #swagger.description = 'Get all health metrics for all users (Admin route).',
        #swagger.security = [{
        "SessionAuth": []
        }],
        #swagger.responses[200] = {
            description: 'All health metrics retrieved successfully.',
        },
        #swagger.responses[404] = {
            description: 'No health records found.',
        },
        #swagger.responses[500] = {
            description: 'Error fetching all user health metrics.',
        }
    */
);

// Get all health metrics for a user
userMetricsRouter.get(
    "/:userId",
    isAuthenticated,
    handleErrors(getUserHealthMetrics),
    /*
        #swagger.tags = ['User Health Metrics'],
        #swagger.description = 'Get all health metrics for a specific user.',
        #swagger.security = [{
        #swagger.security = [{
        "SessionAuth": []
        }],
        #swagger.parameters['userId'] = {
            "name": "userId",
            "in": "path",
            "required": true,
            "type": "string"
        },
        #swagger.responses[200] = {
            description: 'Health metrics retrieved successfully.',
        },
        #swagger.responses[404] = {
            description: 'No health records found for the user.',
        },
        #swagger.responses[500] = {
            description: 'Error fetching user health metrics.',
        }
    */
);

// Get latest record for a user
userMetricsRouter.get(
    "/:userId/latest",
    isAuthenticated,
    handleErrors(getLatestUserHealthMetrics),
    /*
        #swagger.tags = ['User Health Metrics'],
        #swagger.description = 'Get the latest health metric for a specific user.',
        #swagger.security = [{
        "SessionAuth": []
        }],
        #swagger.parameters['userId'] = {
            "name": "userId",
            "in": "path",
            "required": true,
            "type": "string"
        },
        #swagger.responses[200] = {
            description: 'Latest health metric retrieved successfully.',
        },
        #swagger.responses[404] = {
            description: 'No health records found for the user.',
        },
        #swagger.responses[500] = {
            description: 'Error fetching latest health metric.',
        }
    */
);

// Add a new record
userMetricsRouter.post(
    "/:userId/", // Using userId in the path for clarity, but it can be in the body as well
    isAuthenticated, // Ensure the user is authenticated before adding a health metric
    handleErrors(addUserHealthMetric),
    /* 
    #swagger.tags = ["User Health Metrics"]
    #swagger.description = "Add a new health metric for a specific user."
    #swagger.security = [{
        "SessionAuth": []
    }]

    #swagger.parameters['userId'] = {
        name: "userId",
        in: "path",
        required: true,
        type: "string",
        example: "67df521afc6481f5bf781ec2"
    }

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        metrics: {
                            type: "object",
                            properties: {
                                heartRate: { type: "number", example: 72 },
                                bloodPressure: {
                                    type: "object",
                                    properties: {
                                        systolic: { type: "number", example: 120 },
                                        diastolic: { type: "number", example: 80 }
                                    }
                                },
                                bloodSugar: { type: "number", example: 95 },
                                temperature: { type: "number", example: 36.5 },
                                steps: { type: "number", example: 5000 },
                                caloriesBurned: { type: "number", example: 250 },
                                sleepDuration: { type: "number", example: 7.5 },
                                weight: { type: "number", example: 75.2 },
                                hydration: { type: "number", example: 1.5 }
                            }
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[201] = {
        description: "Health metric added successfully.",
        schema: {
            type: "object",
            properties: {
                message: { type: "string", example: "Health metric added" },
                data: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "66102807f2d339001f2e3f3a" },
                        userId: { type: "string", example: "67df521afc6481f5bf781ec2" },
                        metrics: { 
                            type: "object",
                            example: {
                                heartRate: 72,
                                weight: 75.2,
                                sleepDuration: 7.5
                            }
                        },
                        timestamp: { type: "string", example: "2025-04-05T14:45:00.000Z" }
                    }
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: "Invalid input data."
    }

    #swagger.responses[500] = {
        description: "Error adding health metric."
    }
*/
);

// Delete a record
userMetricsRouter.delete(
    "/:id",
    isAuthenticated, // Ensure the user is authenticated before deleting a health metric
    handleErrors(deleteUserHealthMetric),
    /*
        #swagger.tags = ['User Health Metrics'],
        #swagger.description = 'Delete a health metric for a specific user by ID.',
        #swagger.security = [{
        "SessionAuth": []
        }],
        #swagger.parameters['id'] = {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
        },
        #swagger.responses[200] = {
            description: 'Health metric deleted successfully.',
        },
        #swagger.responses[404] = {
            description: 'Health metric not found.',
        },
        #swagger.responses[500] = {
            description: 'Error deleting health metric.',
        }
    */
);

export default userMetricsRouter;
