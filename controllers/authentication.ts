import { Request, Response, NextFunction } from "express";
//import { IUser } from "../models/user";
//import { ObjectId } from "mongodb";

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

/*export function isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const currentUser = req.user as IUser;

        if (currentUser.type == "admin") {
            return next();
        } else {
            res.json("Must be an administrator to access this route.");
        }
    } catch (error) {
        res.json(`Error getting user type: ${error}`);
    }
}

export function isCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
        const currentUser = req.user as IUser;
        const userId = currentUser._id as ObjectId;

        if (currentUser.type == "admin" || userId.toString() == req.params.id) {
            return next();
        } else {
            res.json("Users can only access their own data.");
        }
    } catch (error) {
        console.error(`Error checking the current user: ${error}`);
    }
}*/
