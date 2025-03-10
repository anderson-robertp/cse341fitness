import { Request, Response, NextFunction } from "express";
import passport from "passport";

export async function Login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("google", (err: Error, user: any) => {
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

      res.status(200).json("User logged in.");
    });
  })(req, res, next);
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json("User not logged in.");
  }
}
