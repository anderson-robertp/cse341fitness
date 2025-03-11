import express, { Request, Response, NextFunction } from "express";
const authenticationRouter = express.Router();
import passport from "passport";
import handleErrors from "../utilities";
import { Login } from "../controllers/authentication";

authenticationRouter.get(
  "/google",
  handleErrors(
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  )
);

authenticationRouter.get("/google/callback", handleErrors(Login));

authenticationRouter.get(
  "/logout",
  handleErrors((req: Request, res: Response, next: NextFunction) => {
    req.logout((err: Error) => {
      if (err) {
        return next(err);
      }
      res.status(200).redirect("/");
    });
  })
);

export default authenticationRouter;

//This is a bit different than the suggested routes
//Check for accuracy
