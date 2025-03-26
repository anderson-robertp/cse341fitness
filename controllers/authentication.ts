import { Request, Response, NextFunction } from "express";
import passport from "passport";

// Initiates authentication flow with Google
export function Login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", {
        scope: ["openid", "profile", "email"], // Include the necessary scopes
    })(req, res, next); // Redirect the user to Google
}

// This handles the callback from Google after the user is authenticated
export async function GoogleCallback(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    passport.authenticate("google", (err: Error, user: any) => {
        if (err) {
            return next(err); // Handle errors during authentication
        }

        if (!user) {
            return res.status(500).json({ error: "Could not log in user." });
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }

            // After successful login, you can redirect to another page
            res.status(200).redirect("/"); // Or any route you want
        });
    })(req, res, next); // Pass the request and response to passport
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).redirect("/authentication/google");
    }
}
