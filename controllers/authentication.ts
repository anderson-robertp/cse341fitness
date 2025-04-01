import { Request, Response, NextFunction } from "express";

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
