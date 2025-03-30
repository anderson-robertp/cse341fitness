import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

// Middleware to protect routes
export function authenticateJWT(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) res.sendStatus(403);

    jwt.verify(token || "", process.env.JWT_SECRET || "", (err, user) => {
        if (err) res.sendStatus(403);
        req.user = user;
        next();
    });
}

export function logout(req: Request, res: Response) {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out." });
}
