import { Schema, model, Types } from "mongoose";

//TS interface
interface IUser {
  name: string;
  email: string;
  googleId: string;
  workoutIds?: Types.ObjectId[];
  favoriteExercise?: Types.ObjectId;
}

//Mongoose schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, unique: true, required: true },
    workoutIds: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
    favoriteExercise: { type: Schema.Types.ObjectId, ref: "Exercise" },
  },
  { collection: "Users" }
);

//Mongoose model
export const User = model<IUser>("User", userSchema);
