import express from "express";
import {
    createAchievement,
    getAchievements,
    deleteAchievement,
    getAchievementById,
    updateAchievement,
    getUserAchievements,
    createUserAchievement,
} from "../controllers/achievements";
import handleErrors from "../utilities";
import { isAuthenticated } from "../controllers/authentication";

const achievementsRouter = express.Router();

// Get Achievements Route
achievementsRouter.get(
    "/",
    handleErrors(getAchievements),
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
    handleErrors(getAchievementById),
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
    isAuthenticated,
    handleErrors(createAchievement),
    /*  
#swagger.tags = ['Achievements']
#swagger.description = 'Create a new achievement'
#swagger.security = 
    - SessionAuth: []
#swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: { type: "string", example: "Run 5 miles" },
            description: { type: "string", example: "Run 5 miles in a week" },
            progressGoal: { type: "integer", example: "5" }
          },
          required: ["title", "description", "progressGoal"]
        }
      }
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
    isAuthenticated,
    handleErrors(deleteAchievement),
    /*  
    #swagger.tags = ['Achievements']
    #swagger.description = 'Delete an achievement by ID'
    #swagger.security = 
    - SessionAuth: []
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
    isAuthenticated,
    handleErrors(updateAchievement),
    /*  
    #swagger.tags = ['Achievements']
    #swagger.description = 'Update an existing achievement'
    #swagger.security = 
    - SessionAuth: []
    #swagger.parameters['id'] = {
        "in": "path",
        "required": true,
        "type": "string",
        "description": "The ID of the achievement"
    }
    #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    title: { type: "string", example: "Run 5 miles" },
                    description: { type: "string", example: "Run 5 miles in a week" },
                    progressGoal: { type: "integer", example: "5" }
                },
                required: ["title", "description", "progressGoal"]
            }
        }
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
    isAuthenticated,
    handleErrors(getUserAchievements),
    /*  
    #swagger.tags = ['Achievements']
    #swagger.description = 'Retrieve achievements for a specific user'
    #swagger.security = 
    - SessionAuth: []
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

achievementsRouter.post(
    "/user/:userId",
    isAuthenticated,
    handleErrors(createUserAchievement),
    /*  
#swagger.tags = ['Achievements']
#swagger.description = 'Create a new user achievement'
#swagger.security =
    - SessionAuth: []
#swagger.parameters['userId'] = {
    "in": "path",
    "required": true,
    "type": "string",
    "description": "The ID of the user"
}
#swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: {
                type: "object",
                "properties": {
                        "title": {
                            "type": "string",
                            "example": "Run 5 miles"
                        },
                        "description": {
                            "type": "string",
                            "example": "Run 5 miles in a week"
                        },
                        "progress": {
                            "type": "number",
                            "example": "3"
                        }
                    },
                    "required": ["title", "description", "progress"]
            }
        }
    }
}
#swagger.responses[201] = {         
    description: 'User achievement created successfully.'
}
#swagger.responses[404] = {
    description: 'Achievement not found.'
}
#swagger.responses[500] = {
    description: 'Error creating user achievement.'
}
*/
);

export default achievementsRouter;
