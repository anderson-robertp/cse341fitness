import { Request, Response, NextFunction } from "express";

// Ignore lint; we want ANY function signature here
export default function handleErrors(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
