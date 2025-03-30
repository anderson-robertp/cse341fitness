import { Request, Response, NextFunction } from "express";
import passport from "passport";

export async function Login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", (err: Error, user: Express.User) => {
        if (err) {
            return next(err); // Handle errors
        }
        if (!user) {
            return res.status(500).json({ error: "Could not login user." });
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }

            res.status(200).redirect("/authentication/google/callback");
        });
    })(req, res, next);
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // Check if the environment is set to test, if so, skip authentication for testing purposes
    if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev") {
        console.log("Skipping authentication in test environment. Middleware"); // Log to indicate we're skipping authentication
        // Skip authentication in test environment
        return next(); // Proceed to the next middleware
    } 
    
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
    } else {
        res.status(401).json({ message: "Unauthorized: Please log in first." });
    }
}
