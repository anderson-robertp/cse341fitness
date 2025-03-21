import express from "express";
import {
    createAchievement,
    getAchievements,
    deleteAchievement,
    getAchievementById,
    updateAchievement,
    getUserAchievements
} from "../controllers/achievements";

const achievementsRouter = express.Router();

// Get Achievements Route
achievementsRouter.get(
    "/",
    getAchievements,
    /*  
    #swagger.tags = ['Achievements']
    #swagger.description = 'Retrieve all achievements'
    #swagger.responses[200] = {
        description: 'Achievements retrieved successfully.'
    }
    #swagger.responses[500] = {
        description: 'Error retrieving achievements.'
    }
    */
);

// Get Achievement by ID Route
achievementsRouter.get(
    "/:id",
    getAchievementById,
    /*  
    #swagger.tags = ['Achievements']
    #swagger.description = 'Retrieve an achievement by ID'
    #swagger.parameters['id'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the achievement"
    }
    #swagger.responses[200] = {
        description: 'Achievement retrieved successfully.'
    }
    #swagger.responses[404] = {
        description: 'Achievement not found.'
    }
    #swagger.responses[500] = {
        description: 'Error retrieving achievement.'
    }
    */
);

// Create Achievement Route
achievementsRouter.post(
    "/",
    createAchievement,
    /*  
    #swagger.tags = ['Achievements']
    #swagger.description = 'Create a new achievement'
    #swagger.parameters['body'] = {
        "in": "body",
        "required": true,
        "schema": {
            "title": "Run 5 miles",
            "description": "Run 5 miles in a week",
            "progressGoal": 5
        }
    }
    #swagger.responses[201] = {
        description: 'Achievement created successfully.'
    }
    #swagger.responses[500] = {
        description: 'Error creating achievement.'
    }
    */
);

// Delete Achievement Route
achievementsRouter.delete(
    "/:id",
    deleteAchievement,
    /*  
    #swagger.tags = ['Achievements']
    #swagger.description = 'Delete an achievement by ID'
    #swagger.parameters['id'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the achievement"
    }
    #swagger.responses[200] = {
        description: 'Achievement deleted successfully.'
    }
    #swagger.responses[404] = {
        description: 'Achievement not found.'
    }
    #swagger.responses[500] = {
        description: 'Error deleting achievement.'
    }
    */
);

// Update Achievement Route
achievementsRouter.put(
    "/:id",
    updateAchievement,
    /*  
    #swagger.tags = ['Achievements']
    #swagger.description = 'Update an existing achievement'
    #swagger.parameters['id'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the achievement"
    }
    #swagger.parameters['body'] = {
        "in": "body",
        "required": true,
        "schema": {
            "title": "Run 5 miles",
            "description": "Run 5 miles in a week",
            "progressGoal": 5
        }
    }
    #swagger.responses[200] = {
        description: 'Achievement updated successfully.'
    }
    #swagger.responses[404] = {
        description: 'Achievement not found.'
    }
    #swagger.responses[500] = {
        description: 'Error updating achievement.'
    }
    */
);

// Get User Achievements Route
achievementsRouter.get( 
    
    "/user/:userId",
    getUserAchievements,
    /*  
    #swagger.tags = ['Achievements']
    #swagger.description = 'Retrieve achievements for a specific user'
    #swagger.parameters['userId'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the user"
    }
    #swagger.responses[200] = {
        description: 'User achievements retrieved successfully.'
    }
    #swagger.responses[404] = {
        description: 'No achievements found for the given user.'
    }
    #swagger.responses[500] = {
        description: 'Error retrieving user achievements.'
    }
    */
);

export default achievementsRouter;
