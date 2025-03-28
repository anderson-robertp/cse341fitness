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
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
    } else {
        res.status(401).json({ message: "Unauthorized: Please log in first." });
    }
}
