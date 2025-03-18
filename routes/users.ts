import express from "express";
import { getUserById, updateUserById } from "../controllers/users";
import handleErrors from "../utilities";
import { userValidationRules, userValidate } from "../utilities/userValidator";

const usersRouter = express.Router();

//Get User
usersRouter.get(
  "/:id",
  handleErrors(getUserById)
  /* #swagger.parameters['id'] = {
        in: 'string',
        description: 'user id',
        required: 'true',
        type: 'string',
} */
);

//Update User
usersRouter.put(
  "/:id",
  userValidationRules(),
  userValidate,
  handleErrors(updateUserById)
  /* #swagger.parameters['id'] = {
        in: 'string',
        description: 'user id',
        required: 'true',
        type: 'string',
} */
);

export default usersRouter;
