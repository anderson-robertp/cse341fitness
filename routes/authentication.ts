import express, { Request, Response, NextFunction } from "express";
const authenticationRouter = express.Router();
import passport from "passport";
import handleErrors from "../utilities";

authenticationRouter.get(
    "/google",
    /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Redirects the user to Google authentication page. 
      **Note:** You must manually click this link to authenticate with Google: 
       [Click here to log in with Google](http://localhost:3000/authentication/google) OR (https://cse341fitness.onrender.com/authentication/google)'
    #swagger.security = 
    - oauth2: ["opendid", "profile", "email"]
    #swagger.responses[302] = {
        description: 'Redirects to Google OAuth login'
    }
    */

    passport.authenticate("google", {
        scope: ["email", "profile"],
        prompt: "select_account",
    }),
);

authenticationRouter.get(
    "/google/callback",
    handleErrors(
        passport.authenticate("google", {
            failureRedirect: "/", // Redirect to home if authentication fails
        }),
    ),
    handleErrors((req: Request, res: Response) => {
        req.session.save(() => {
            res.status(200).redirect("/api-docs");
        });
    }),
    /*  
    #swagger.tags = ['Authentication'],
    #swagger.description = 'Authenticate the user.',
    #swagger.security = 
    - oauth2: ["opendid", "profile", "email"]
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
                return next(`Logout failed: ${err}`);
            }

            req.session.destroy(() => {
                res.clearCookie("sessionId");
                res.json({ message: "Logged out" });
            });
        });
    }),
    /*  
    #swagger.tags = ['Authentication'],
    #swagger.description = 'Logout user.',
    #swagger.security = 
    - oauth2: ["opendid", "profile", "email"]
    #swagger.responses[200] = {
        description: 'User logged out',
    }
    */
);

export default authenticationRouter;
