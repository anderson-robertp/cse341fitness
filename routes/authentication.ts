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
       [Click here to log in with Google](http://localhost:3000/authentication/google)'
    #swagger.responses[302] = {
        description: 'Redirects to Google OAuth login'
    }
    */

    passport.authenticate("google", { scope: ["email", "profile"] }),
);

authenticationRouter.get(
    "/google/callback",
    handleErrors(
        passport.authenticate("google", {
            failureRedirect: "/", // Redirect to home if authentication fails
        }),
    ),
    handleErrors((req: Request, res: Response) => {
        res.redirect("/api-docs");
    }),
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
            // Redirect to logged-out page after successful logout
            res.redirect("/authentication/logged-out");
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

// Logged-out page route
authenticationRouter.get("/logged-out", (req: Request, res: Response) => {
    res.send(`
        <html>
            <head><title>You are logged out</title></head>
            <body>
                <h1>You are logged out</h1>
                <p><a href="/api-docs" target="_blank">Go back to Swagger (not logged in)</a></p>
            </body>
        </html>
    `);
    /*  
    #swagger.tags = ['Authentication'],
    #swagger.description = 'Logout User Page.',
    #swagger.responses[200] = {
        description: 'User logged out',
    }
    */
});

export default authenticationRouter;
