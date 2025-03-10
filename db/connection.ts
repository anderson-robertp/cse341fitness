import mongoose from "mongoose";
import { Connection } from "mongoose";
import env from "dotenv";
env.config();

const uri = process.env.MONGODB_URI as string;

let database: Connection | null = null;

//Initialize the database
export async function InitializeDatabase() {
  try {
    if (!database) {
      await mongoose.connect(uri);
      database = mongoose.connection;
    } else {
      console.log("Database already initialized");
      return;
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

//Retrieve the database
export function GetDatabase() {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
}
