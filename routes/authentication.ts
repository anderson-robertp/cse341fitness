import express, { Request, Response, NextFunction } from "express";
const authenticationRouter = express.Router();
import passport from "passport";
import handleErrors from "../utilities";
import { logout } from "../controllers/authentication";

authenticationRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["openid", "email", "profile"] }),
    /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Redirects the user to Google authentication page. **Note:** You must manually click this link to authenticate with Google: 
       [Click here to log in with Google](http://localhost:3000/authentication/google)'
    #swagger.security = [{ "BearerAuth": [] }, { "OAuth2": ["openid", "profile", "email"] }]
    #swagger.responses[302] = {
        description: 'Redirects to Google OAuth login'
    }
    */
);

authenticationRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/google", // Redirect to home if authentication fails
    }),
    async (req, res) => {
        // Redirect to Swagger docs after successful authentication
        res.redirect("/api-docs");
    },
    /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Authenticate the user with Google OAuth2'
    #swagger.security = [{ "BearerAuth": [] }, { "OAuth2": ["openid", "profile", "email"] }]
    #swagger.responses[200] = {
        description: 'User logged in',
    }
    #swagger.responses[500] = {
        description: 'Error authenticating the user.',
    }
    */
);

authenticationRouter.get(
    "/logout",
    handleErrors(logout),
    /*  
    #swagger.tags = ['Authentication'],
    #swagger.description = 'Logout user.',
    #swagger.security = [{ "BearerAuth": [] }, { "OAuth2": ["openid", "profile", "email"] }]
    #swagger.responses[200] = {
        description: 'User logged out',
    }
    */
);

export default authenticationRouter;

//TODO: Change redirect in logout to api-docs?
