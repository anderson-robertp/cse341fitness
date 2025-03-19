import { Schema, model, Types } from "mongoose";

//TS interface
interface IWorkout {
    type: string;
    duration: number;
    caloriesBurned: number;
    exerciseIds?: Types.ObjectId[];
    timestamp: Date;
}

//Mongoose schema
const workoutSchema = new Schema<IWorkout>(
    {
        type: { type: String, required: true },
        duration: { type: Number, required: true },
        caloriesBurned: { type: Number, required: true },
        exerciseIds: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
        timestamp: { type: Date, required: true },
    },
    { collection: "Workouts" },
);

//Mongoose model
export const Workout = model<IWorkout>("Workout", workoutSchema);
