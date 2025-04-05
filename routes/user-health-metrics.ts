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

const userMetricsRouter = express.Router();

// Routes
// Get all health metrics (Admin route)
userMetricsRouter.get(
    "/all",
    handleErrors(getAllUserHealthMetrics),
    /*
        #swagger.tags = ['User Health Metrics'],
        #swagger.description = 'Get all health metrics for all users (Admin route).',
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
    handleErrors(getUserHealthMetrics),
    /*
        #swagger.tags = ['User Health Metrics'],
        #swagger.description = 'Get all health metrics for a specific user.',
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
    handleErrors(getLatestUserHealthMetrics),
    /*
        #swagger.tags = ['User Health Metrics'],
        #swagger.description = 'Get the latest health metric for a specific user.',
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
    "/",
    handleErrors(addUserHealthMetric),
    /* 
    #swagger.tags = ["User Health Metrics"]
    #swagger.description = "Add a new health metric for a specific user."

    #swagger.parameters['body'] = {
        "name": "body",
        "in": "body",
        "description": "Health metric data for the user.",
        "required": true,
        "schema": {
            "type": "object",
            "properties": {
                "userId": {
                    "type": "string",
                    "example": "67df521afc6481f5bf781ec2"
                },
                "metrics": {
                    "type": "object",
                    "properties": {
                        "heartRate": {
                            "type": "integer",
                            "example": 72
                        },
                        "bloodPressure": {
                            "type": "object",
                            "properties": {
                                "systolic": {
                                    "type": "integer",
                                    "example": 120
                                },
                                "diastolic": {
                                    "type": "integer",
                                    "example": 80
                                }
                            }
                        },
                        "bloodSugar": {
                            "type": "integer",
                            "example": 95
                        },
                        "temperature": {
                            "type": "number",
                            "example": 36.5
                        },
                        "steps": {
                            "type": "integer",
                            "example": 5000
                        },
                        "caloriesBurned": {
                            "type": "integer",
                            "example": 250
                        },
                        "sleepDuration": {
                            "type": "number",
                            "example": 7.5
                        },
                        "weight": {
                            "type": "number",
                            "example": 75.2
                        },
                        "hydration": {
                            "type": "number",
                            "example": 1.5
                        }
                    }
                },
                "timestamp": {
                    "type": "string",
                    "example": "2025-03-22T08:00:00.000+00:00"
                }
            },
            "required": [
                "userId",
                "metrics",
                "timestamp"
            ]
        }
    }

    #swagger.responses[201] = {
        "description": "Health metric added successfully."
    }
    #swagger.responses[400] = {
        "description": "Invalid input data."
    }
    #swagger.responses[500] = {
        "description": "Error adding health metric."
    }
    */
);

// Delete a record
userMetricsRouter.delete(
    "/:id",
    handleErrors(deleteUserHealthMetric),
    /*
        #swagger.tags = ['User Health Metrics'],
        #swagger.description = 'Delete a health metric for a specific user by ID.',
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
