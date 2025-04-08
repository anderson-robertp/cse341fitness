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
import { userValidationRules, userValidate } from "../utilities/userValidator";

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
          "type": 'string',
          "example": "67f55757445af75667ed5be5"
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
    userValidationRules(),
    userValidate,
    handleErrors(updateUserById),
    /*
        #swagger.tags = ['Users']
        #swagger.description = 'Update a user’s details.'
        #swagger.security = [{
            "SessionAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'User ID to update',
            required: true,
            type: 'string',
            example: '67f55757445af75667ed5be5'
        }
        #swagger.requestBody = {
            required: true,
            content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["name", "email"],
                    properties: {
                        name: {
                        type: "string",
                        example: "John Doe"
                    },
                    email: {
                    type: "string",
                    example: "john@example.com"
                    },
                    workoutIds: {
                    type: "array",
                    items: {
                        type: "string"
                    },
                    example: ["60b8d7e9ef9b3a8ed64f1234"]
                    },
                    favoriteExercise: {
                    type: "string",
                    example: "67f3e04d38c8ac7c7f11daf3"
                    },
                    achievements: {
                    type: "array",
                    items: {
                        type: "string"
                    },
                    example: ["60b8d7e9ef9b3a8ed64f1111"]
                    }
                }
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
  #swagger.security = [{
    SessionAuth: []
  }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'User ID',
    required: true,
    type: 'string',
    example: '67f55757445af75667ed5be5'
  }
  #swagger.parameters['property'] = {
    in: 'path',
    description: 'Property name (e.g., workoutIds, favoriteExercise, or achievements)',
    required: true,
    type: 'string',
    example: 'favoriteExercise'
  }
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            value: {
              type: "string",
              example: "67f3e04d38c8ac7c7f11daf3"
            }
          },
          required: ["value"]
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'User property updated.'
  }
  #swagger.responses[400] = {
    description: 'Invalid property.'
  }
*/
);

// Create a new user
usersRouter.post(
    "/",
    userValidationRules(), // Validate request body using the defined rules
    userValidate, // Middleware to check for validation errors
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
