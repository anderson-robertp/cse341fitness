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
            .notEmpty()
            .withMessage("Valid favorite exercise is required.")
            .isMongoId()
            .withMessage("favoriteExercise must be a valid ObjectId"),
    ];
}

//Validation
export function userValidate(req: Request, res: Response, next: NextFunction) {
    // const { name, email, workoutIds, favoriteExercise } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    next();
}
