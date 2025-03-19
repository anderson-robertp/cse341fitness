import { Schema, model, Types } from "mongoose";

//TS interface for HealthMetric
interface IHealthMetric {
    userId: Types.ObjectId;
    healrhMetric: string;
    value: number;
    unit: string;
    timestamp: Date;
}

//HealthMetric schema
const healthMetricSchema = new Schema<IHealthMetric>(
    {
        userId: { type: Schema.Types.ObjectId, ref:"User", required: true },
        healrhMetric: { type: String, required: true },
        value: { type: Number, required: true },
        unit: { type: String, required: true },
        timestamp: { type: Date, required: true },
    },
    { collection: "healthMetrics" }
);

//Export Mongoose Model
export const HealthMetric = model<IHealthMetric>("HealthMetric", healthMetricSchema);