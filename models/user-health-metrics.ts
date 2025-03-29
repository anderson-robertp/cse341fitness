import { Schema, model, Types } from "mongoose";

// TS interface for userHealthMetrics
interface IUserHealthMetrics {
    userId: Types.ObjectId; // User ID (Meta Field in MongoDB)
    timestamp: Date; // Timestamp of the recorded metric
    metrics: {
        heartRate?: number; // BPM (Beats per Minute)
        bloodPressure?: {
            systolic: number;
            diastolic: number;
        }; // Structured blood pressure
        bloodSugar?: number; // mg/dL
        temperature?: number; // °C
        steps?: number; // Steps taken
        caloriesBurned?: number; // Calories burned
        sleepDuration?: number; // Sleep duration in hours
        weight?: number; // Weight in kg or lbs
        hydration?: number; // Hydration in liters or mL
    };
}

const userHealthMetricsSchema = new Schema<IUserHealthMetrics>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        timestamp: { type: Date, required: true },
        metrics: {
            heartRate: { type: Number, default: null },
            bloodPressure: {
                systolic: { type: Number, default: null },
                diastolic: { type: Number, default: null },
            },
            bloodSugar: { type: Number, default: null },
            temperature: { type: Number, default: null },
            steps: { type: Number, default: null },
            caloriesBurned: { type: Number, default: null },
            sleepDuration: { type: Number, default: null },
            weight: { type: Number, default: null },
            hydration: { type: Number, default: null },
        },
    },
    { collection: "userHealthMetrics" }, // Collection name in MongoDB
    //{ timestamps: true }
);

export const UserHealthMetrics = model<IUserHealthMetrics>("UserHealthMetrics", userHealthMetricsSchema);