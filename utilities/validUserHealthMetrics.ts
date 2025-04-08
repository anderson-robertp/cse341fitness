import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

//Rules
export function userHealthMetricValidationRules() {
    return [
        body("userId")
            .notEmpty()
            .withMessage("Valid user id is required.")
            .isMongoId()
            .withMessage("userId must be a valid ObjectId"),

        body("timestamp")
            .notEmpty(),
        // .isISO8601()
        // .withMessage("timestamp must be a valid ISO 8601 date string"),

        body("metrics")
            .notEmpty()
            .withMessage("Metrics object is required."),
        body("metrics.heartRate")
            .optional()
            .isNumeric()
            .withMessage("heartRate must be a number."),
        body("metrics.bloodPressure.systolic")
            .optional()
            .isNumeric()
            .withMessage("systolic must be a number."),
        body("metrics.bloodPressure.diastolic")
            .optional()
            .isNumeric()
            .withMessage("diastolic must be a number."),
        body("metrics.bloodSugar")
            .optional()
            .isNumeric()
            .withMessage("bloodSugar must be a number."),
        body("metrics.temperature")
            .optional()
            .isNumeric()
            .withMessage("temperature must be a number."),
        body("metrics.steps")
            .optional()
            .isNumeric()
            .withMessage("steps must be a number."),
        body("metrics.caloriesBurned")
            .optional()
            .isNumeric()
            .withMessage("caloriesBurned must be a number."),
        body("metrics.sleepDuration")
            .optional()
            .isNumeric()
            .withMessage("sleepDuration must be a number."),
        body("metrics.weight")
            .optional()
            .isNumeric()
            .withMessage("weight must be a number."),
        body("metrics.hydration")
            .optional()
            .isNumeric()
            .withMessage("hydration must be a number."),
    ];


}

//Validation
export function userHealthMetricValidate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    next();
}