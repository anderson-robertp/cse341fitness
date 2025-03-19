import express, { Request, Response } from "express";
import {
    createAchievement,
    getAchievements,
    deleteAchievement,
    getAchievementById,
    updateAchievement,
} from "../controllers/achievements";

const achievementsRouter = express.Router();

//Get Achievements Route
achievementsRouter.get(
    "/",
    getAchievements,
    /*  
    #swagger.tags = ['Achievements'],
    #swagger.description = 'Get all achievements.',
    #swagger.responses[200] = {
        description: 'Achievements retrieved successfully.',
    },
    #swagger.responses[500] = {
        description: 'Error getting achievements.',
    }
    */
);

//Get Achievement by ID Route
achievementsRouter.get(
    "/:id",
    getAchievementById,
    /*  
    #swagger.tags = ['Achievements'],
    #swagger.description = 'Get achievement.',
    #swagger.parameters['id'] = {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
    },
    #swagger.responses[200] = {
        description: 'Achievement retrieved successfully.',
    },
    #swagger.responses[404] = {
        description: 'Achievement not found.',
    },
    #swagger.responses[500] = {
        description: 'Error retrieving achievement.',
    }
    */
);

//Create Achievement Route
achievementsRouter.post(
    "/",
    createAchievement,
    /*  
    #swagger.tags = ['Achievements'],
    #swagger.description = 'Create a new achievement.',
    #swagger.parameters['body'] = {
            name: 'body',
            in: 'body',
            schema: {
                $title: 'Run 5 miles',
                $description: 'Run 5 miles in a week',
                progressGoal: 5
            }
    },
    #swagger.responses[201] = {
        description: 'Achievement created successfully.',
    },
    #swagger.responses[500] = {
        description: 'Error creating achievement.',
    }
  */
);

//Delete Achievement Route
achievementsRouter.delete(
    "/:id",
    deleteAchievement,
    /*  
    #swagger.tags = ['Achievements'],
    #swagger.description = 'Delete achievement.',
    #swagger.parameters['id'] = {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
    },
    #swagger.responses[200] = {
        description: 'Achievement deleted successfully.',
    },
        #swagger.responses[404] = {
        description: 'Achievement not found.',
    },
    #swagger.responses[500] = {
        description: 'Error deleting achievement.',
    }
    */
);

//update Achievement Route
achievementsRouter.put(
    "/:id",
    updateAchievement,
    /*  
    #swagger.tags = ['Achievements'],
    #swagger.description = 'Update a new achievement.',
    #swagger.parameters['id'] = {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
    },
    {
        name: 'body',
        in: 'body',
        schema: {
            $title: 'Run 5 miles',
            $description: 'Run 5 miles in a week',
            progressGoal: 5
        }
    },
    #swagger.responses[200] = {
        description: 'Achievement updated successfully.',
    },
        #swagger.responses[404] = {
        description: 'Achievement not found.',
    },
    #swagger.responses[500] = {
        description: 'Error updating achievement.',
    }
    */
);

export default achievementsRouter;
