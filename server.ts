/* eslint-disable no-console */
import "dotenv/config";
import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import "./config/passport";
import router from "./routes/index";
import { InitializeDatabase } from "./db/connection";

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:3000", // Allow your frontend to make requests
    credentials: true, // Allow cookies to be passed with requests
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS with your custom options
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "keyboard cat",
        resave: false,
        saveUninitialized: false,
    }),
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Protect non-GET routes globally before applying routes
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === "GET") {
        return next(); // Allow GET requests for everyone
    }

    if (req.isAuthenticated()) {
        return next(); // Allow other requests if user is authenticated
    }

    res.status(401).json({ message: "Unauthorized: Please log in first." });
});

// Register authentication routes first (public)
app.use("/authentication", router);

// Register all other routes
app.use(router);

// Initialize the database
if (process.env.NODE_ENV !== "test") {
    InitializeDatabase()
        .then(() => {
            app.listen(port, () => {
                console.log(`Server is running on ${host}:${port}`);
                console.log(
                    `Swagger Docs available at http://${host}:${port}/api-docs`,
                );
            });
        })
        .catch((error: Error) => {
            console.error("Error initializing database:", error);
        });
}

export default app;
