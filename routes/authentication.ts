import express, { Request, Response, NextFunction } from "express";
const authenticationRouter = express.Router();
import passport from "passport";
import handleErrors from "../utilities";
import { Login } from "../controllers/authentication";

authenticationRouter.get(
    "/google",
    handleErrors(
        passport.authenticate("google", {
            scope: ["email", "profile"],
        }),
    ),
    /*  
    #swagger.tags = ['Authentication'],
    #swagger.description = 'Go to authentication page.',
  */
);

authenticationRouter.get(
    "/google/callback",
    handleErrors(Login),
    /*  
    #swagger.tags = ['Authentication'],
    #swagger.description = 'Authenticate the user.',
    #swagger.responses[200] = {
        description: 'User logged in',
    },
    #swagger.responses[500] = {
        description: 'Error authenticating the user.',
    }
    */
);

authenticationRouter.get(
    "/logout",
    handleErrors((req: Request, res: Response, next: NextFunction) => {
        req.logout((err: Error) => {
            if (err) {
                return next(err);
            }
            res.status(200).redirect("/");
        });
    }),
    /*  
    #swagger.tags = ['Authentication'],
    #swagger.description = 'Logout user.',
    #swagger.responses[200] = {
        description: 'User logged out',
    }
    */
);

export default authenticationRouter;
