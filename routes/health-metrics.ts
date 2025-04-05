import express from "express";
import {
    createHealthMetric,
    getHealthMetrics,
    getHealthMetricById,
    updateHealthMetric,
    deleteHealthMetric,
} from "../controllers/health-metrics";
import handleErrors from "../utilities";

const metricsRouter = express.Router();

//Get Health Metrics Route
metricsRouter.get(
    "/",
    handleErrors(getHealthMetrics),
    /*  
        #swagger.tags = ['Health Metrics'],
        #swagger.description = 'Get all health metrics.',
        #swagger.security = 
        - SessionAuth: []
        #swagger.responses[200] = {
            description: 'Health metrics retrieved successfully.',
        },
        #swagger.responses[500] = {
            description: 'Error getting health metrics.',
        }
        */
);

//Get Health Metric by ID Route
metricsRouter.get(
    "/:id",
    handleErrors(getHealthMetricById),
    /*  
        #swagger.tags = ['Health Metrics'],
        #swagger.description = 'Get health metric by ID.',
        #swagger.security = 
        - SessionAuth: []
        #swagger.parameters['id'] = {
                "name": "id",
                "in": "path",
                "required": true,
                "type": "string"
        },
        #swagger.responses[200] = {
            description: 'Health metric retrieved successfully.',
        },
        #swagger.responses[404] = {
            description: 'Health metric not found.',
        },
        #swagger.responses[500] = {
            description: 'Error retrieving health metric.',
        }
        */
);

//Create Health Metric Route
metricsRouter.post(
    "/",
    handleErrors(createHealthMetric),
    /*  
        #swagger.tags = ['Health Metrics'],
        #swagger.description = 'Create a new health metric.',
        #swagger.security = 
        - SessionAuth: []
        #swagger.parameters['body'] = {
                name: 'body',
                in: 'body',
                description: 'Health metric data.',
                required: true,
                schema: {
                    $userId: 'string',
                    $healthMetric: 'string',
                    $value: 'number',
                    $unit: 'string',
                    $timestamp: 'date'
                }
        },
        #swagger.responses[201] = {
            description: 'Health metric created successfully.',
            schema: { $ref: '#/definitions/HealthMetric' }
        },
        #swagger.responses[500] = {
            description: 'Error creating health metric.',
        }
        */
);

//Update Health Metric Route
metricsRouter.put(
    "/:id",
    handleErrors(updateHealthMetric),
    /*  
        #swagger.tags = ['Health Metrics'],
        #swagger.description = 'Update a health metric by ID.',
        #swagger.security = 
        - SessionAuth: []
        #swagger.parameters['id'] = {
                "name": "id",
                "in": "path",
                "required": true,
                "type": "string"
        },
        #swagger.parameters['body'] = {
                name: 'body',
                in: 'body',
                description: 'Updated health metric data.',
                required: true,
                schema: {
                    $userId: 'string',
                    $healthMetric: 'string',
                    $value: 'number',
                    $unit: 'string',
                    $timestamp: 'date'
                }
        },
        #swagger.responses[200] = {
            description: 'Health metric updated successfully.',
            schema: { $ref: '#/definitions/HealthMetric' }
        },
        #swagger.responses[404] = {
            description: 'Health metric not found.',
        },
        #swagger.responses[500] = {
            description: 'Error updating health metric.',
        }
        */
);

//Delete Health Metric Route
metricsRouter.delete(
    "/:id",
    handleErrors(deleteHealthMetric),
    /*  
        #swagger.tags = ['Health Metrics'],
        #swagger.description = 'Delete a health metric by ID.',
        #swagger.security = 
        - SessionAuth: []
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

//Get Health Metrics by User ID Route
metricsRouter.get(
    "/user/:userId",
    handleErrors(getHealthMetrics),
    /*  
        #swagger.tags = ['Health Metrics'],
        #swagger.description = 'Get health metrics by user ID.',
        #swagger.security = 
        - SessionAuth: []
        #swagger.parameters['userId'] = {
                "name": "userId",
                "in": "path",
                "required": true,
                "type": "string"
        },
        #swagger.responses[200] = {
            description: 'Health metrics retrieved successfully.',
        },
        #swagger.responses[500] = {
            description: 'Error retrieving health metrics.',
        }
        */
);

//Export the router
export default metricsRouter;
