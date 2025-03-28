import mongoose from "mongoose";
import env from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";

env.config();

let mongoServer: MongoMemoryServer | null = null;
let isConnected = false; // Track connection status

const uri = process.env.MONGODB_URI as string;

//Initialize the database
export async function InitializeDatabase(): Promise<void> {
    if (isConnected) {
        console.log("Database is already connected");
        return; // Exit if already connected
    }
    console.log("MongoDB URI:", uri);
    try {
        await mongoose.connect(uri, {
            dbName: "cse341fitness",
        });
        isConnected = true; // Update connection status
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

// Close the database connection
export async function CloseDatabase(): Promise<void> {
    if (!isConnected) {
        console.log("No active database connection to close.");
        return;
    }
    try {
        await mongoose.connection.close();
        isConnected = false; // Update connection status
        console.log("Database connection closed successfully");
    } catch (error) {
        console.error("Error closing database connection:", error);
    }
}

// Initialize in-memory MongoDB server for testing purposes
export async function InitializeInMemoryDatabase(): Promise<void> {
    if (isConnected) {
        console.log(
            "Database already connected. Closing existing connection first...",
        );
        await CloseDatabase();
    }

    mongoServer = await MongoMemoryServer.create();
    const testUri = mongoServer.getUri();

    try {
        await mongoose.connect(testUri, { dbName: "testDB" });
        isConnected = true;
        console.log("In-memory database connected successfully");
    } catch (error) {
        console.error("Error initializing in-memory database:", error);
    }
}

// Close the in-memory database connection safely
export async function CloseInMemoryDatabase(): Promise<void> {
    if (!isConnected || !mongoServer) {
        console.log("No active in-memory database to close.");
        return;
    }

    try {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
        isConnected = false;
        console.log("In-memory database connection closed successfully");
    } catch (error) {
        console.error("Error closing in-memory database connection:", error);
    }
}
