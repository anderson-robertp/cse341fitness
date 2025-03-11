import mongoose from "mongoose";
import env from "dotenv";
env.config();

const uri = process.env.MONGODB_URI as string;

//Initialize the database
export async function InitializeDatabase() {
  try {
    await mongoose.connect(uri, {
      dbName: "cse341fitness",
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
