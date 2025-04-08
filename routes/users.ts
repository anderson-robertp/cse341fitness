import express from "express";
import {
    getUserById,
    updateUserById,
    getUserProperty,
    updateUserProperty,
    createUser,
    deleteUserById,
    getAllUsers, // Added for retrieving all users, if needed
} from "../controllers/users";
import handleErrors from "../utilities";

const usersRouter = express.Router();

usersRouter.get(
    "/:id",
    handleErrors(getUserById),
    /*
     #swagger.tags = ['Users']
     #swagger.description = 'Get user by ID.'
     #swagger.security =
     - SessionAuth: []
     #swagger.parameters['id'] = {
         "in": "path",
          "description": 'User ID to retrieve',
          "required": true,
          "type": 'string'
      }
      #swagger.responses[200] = {
          description: 'User details retrieved successfully.'
      }
      #swagger.responses[404] = {
          description: 'User not found.'
      }
     */
);

usersRouter.get(
    "/:id/:property",
    handleErrors(getUserProperty),
    /*
      #swagger.tags = ['Users']
      #swagger.description = 'Fetch a specific property of a user.'
      #swagger.security = 
      - SessionAuth: []
      #swagger.parameters['id'] = {
          "in": "path",
          "description": 'User ID',
          "required": "true",
          "type": 'string'
      }
      #swagger.parameters['property'] = {
          "in": 'path',
          "description": 'Property name (e.g., name, email, workoutIds)',
          "required": true,
          "type": 'string'
      }
      #swagger.responses[200] = {
          description: 'User property retrieved.'
      }
      #swagger.responses[400] = {
          description: 'Invalid property.'
      }
     */
);

usersRouter.put(
    "/:id",
    handleErrors(updateUserById),
    /*
      #swagger.tags = ['Users']
      #swagger.description = 'Update a user’s details.'
      #swagger.security =
      - SessionAuth: []
      #swagger.parameters['id'] = {
          "in": 'path',
          "description": 'User ID to update',
          "required": true,
          "type": 'string'
      }
      #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "John Doe" },
                        email: { type: "string", example: "john@example.com" },
                        workoutIds: { type: "array", items: { type: "string" }, example: ["60b8d7e9ef9b3a8ed64f1234"] },
                        favoriteExercise: { type: "string", example: "Dead lifts" },
                        achievements: { type: "array", items: { type: "string" }, example: ["60b8d7e9ef9b3a8ed64f1111"] }
                    },
                required: ["name", "email"]
                }
            }
        }
      }
      #swagger.responses[200] = {
          description: 'User updated.'
      }
      #swagger.responses[404] = {
          description: 'User not found.'
      }
     */
);

usersRouter.put(
    "/:id/:property",
    handleErrors(updateUserProperty),
    /*
     #swagger.tags = ['Users']
     #swagger.description  = 'Update a single property of a user.'
     #swagger.security =
     - SessionAuth: []
     #swagger.parameters['id'] = {
         "in": "path",
         "description": "User ID",
         "required": true,
         "type": "string"
     }
     #swagger.parameters['property'] = {
         "in": "path",
         "description": "Property name (e.g., email, favoriteExercise)",
         "required": true,
         "type": "string"
     }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "value": { 
                            "type": "string", 
                            "example": "johndoe@gmail.com" 
                        }
                    },
                    "required": ["value"]
                }
            }
        }
    }
     #swagger.responses[200] = {
         "description": "User property updated."
     }
     #swagger.responses[400] = {
         "description": "Invalid property."
     }
    */
);

// Create a new user
usersRouter.post(
    "/",
    handleErrors(createUser), // Handle the request and catch errors
    /*
        #swagger.ignore = true
    */
);

// Delete a user by ID
usersRouter.delete(
    "/:id",
    handleErrors(deleteUserById),
    /*
        #swagger.tags = ['Users']
        #swagger.description = 'Delete a user by ID.'
        #swagger.security =
        - SessionAuth: []
        #swagger.parameters['id'] = {
            "in": "path",
            "description": "User ID to delete",
            "required": true,
            "type": "string"
        }
        #swagger.responses[200] = {
            description: 'User deleted successfully.'
        }
        #swagger.responses[404] = {
            description: 'User not found.'
        }
        #swagger.responses[500] = {
            description: 'Error deleting user.'
        }
    */
);

// retrieve all users
usersRouter.get(
    "/",
    handleErrors(getAllUsers), // Handle the request and catch errors
    /*
     #swagger.tags = ['Users']
     #swagger.description = 'Retrieve all users.'
     #swagger.security =
     - SessionAuth: []
     #swagger.responses[200] = {
         description: 'List of users retrieved successfully.'
     }
    */
);

export default usersRouter;
