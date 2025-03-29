import { Schema, model, Types, Document } from "mongoose";

// TS interface for user
export interface IUser extends Document {
    name: string;
    email: string;
    googleId: string;
    workoutIds?: Types.ObjectId[];
    favoriteExercise?: Types.ObjectId;
    achievements?: Types.ObjectId[];
    [key: string]: unknown; // Allow additional properties
}

// Mongoose schema for user
const userSchema = new Schema<IUser & Document>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        googleId: { type: String, unique: true, required: true },
        workoutIds: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
        favoriteExercise: { type: Schema.Types.ObjectId, ref: "Exercise" },
        achievements: [{ type: Schema.Types.ObjectId, ref: "UserAchievement" }],
    },
    { collection: "Users", strict: false },
);

// Extend the model with IUser and Document
export const User = model<IUser & Document>("User", userSchema);
