import { Request, Response, NextFunction } from "express";

export default function handleErrors(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
