import { Schema, model, Types } from "mongoose";

//TS interface for Achievement
interface IAchievement {
    title: string;
    description: string;
    progressGoal?: number;
}

//TS interface for userAchievement
interface IUserAchievement {
    userId: Types.ObjectId;
    achievementId: Types.ObjectId;
    progress: number;
    unlockedAt?: Date;
}

//Achievement schema
const achievementSchema = new Schema<IAchievement>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        progressGoal: { type: Number, required: false },
    },
    { collection: "Achievements" },
);

//UserAchievement schema
const userAchievementSchema = new Schema<IUserAchievement>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        achievementId: {
            type: Schema.Types.ObjectId,
            ref: "Achievement",
            required: true,
        },
        progress: { type: Number, required: true },
        unlockedAt: { type: Date, required: false },
    },
    { collection: "UserAchievements" },
);

//Export Mongoose Models
export const Achievement = model<IAchievement>(
    "Achievement",
    achievementSchema,
);
export const UserAchievement = model<IUserAchievement>(
    "UserAchievement",
    userAchievementSchema,
);
