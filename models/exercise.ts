import { Schema, model } from "mongoose";

//TS interface
interface IExercise {
  name: string;
  type: string;
  duration?: number;
  sets?: number;
  reps?: number;
  weight?: number;
  caloriesBurned: number;
  timestamp: Date;
}

//Mongoose schema
const exerciseSchema = new Schema<IExercise>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: false },
    sets: { type: Number, required: false },
    reps: { type: Number, required: false },
    weight: { type: Number, required: false },
    caloriesBurned: { type: Number, required: true },
    timestamp: { type: Date, required: true },
  },
  { collection: "Exercises" }
);

//Mongoose model
export const Exercise = model<IExercise>("Exercise", exerciseSchema);
