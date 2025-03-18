import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

//Rules
export function userValidationRules() {
  return [
    body("name")
      .trim()
      .notEmpty()
      .escape()
      .withMessage("Valid name is required."),

    body("email")
      .isEmail()
      .trim()
      .escape()
      .normalizeEmail()
      .withMessage("Valid email is required."),

    body("workoutIds")
      .trim()
      .notEmpty()
      .escape()
      .isAlpha()
      .withMessage("Valid workout ids are required."),

    body("favoriteExercise")
      .trim()
      .isLength({ max: 3 })
      .escape()
      .isInt()
      .withMessage("Valid faovrite exercise is required."),
  ];
}

//Validation
export function userValidate(req: Request, res: Response, next: NextFunction) {
  const { name, email, workoutIds, favoriteExercise } = req.body;

  let errors: any = [];

  errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
}
