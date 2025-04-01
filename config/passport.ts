/* eslint-disable no-console */
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import env from "dotenv";
import { User, IUser } from "../models/user"; // Importing User model and IUser type
import { Profile } from "passport";

// Load environment variables
env.config();

// Check if required environment variables are set
if (
    !process.env.CLIENT_ID ||
    !process.env.CLIENT_SECRET ||
    !process.env.CALLBACK_URL
) {
    throw new Error("Missing required environment variables for Google OAuth");
}

const GoogleStrategy = passportGoogle.Strategy;

// Configure Google OAuth strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID || "",
            clientSecret: process.env.CLIENT_SECRET || "",
            callbackURL:
                process.env.CALLBACK_URL ||
                "http://localhost:3000/authentication/google/callback", // Default callback URL
            passReqToCallback: true,
        },
        async (
            req: import("express").Request,
            accessToken: string,
            refreshToken: string,
            params: passportGoogle.GoogleCallbackParameters,
            profile: Profile,
            done: passportGoogle.VerifyCallback,
        ) => {
            try {
                // Find the Google user
                const existingUser = await User.findOne({
                    googleId: profile.id,
                }).exec();

                // If user doesn't exist, create a new user
                if (!existingUser) {
                    const newUser = new User({
                        name: profile.displayName,
                        email: profile.emails ? profile.emails[0].value : "",
                        googleId: profile.id,
                    });

                    try {
                        const createdUser = await newUser.save();
                        done(null, createdUser);
                    } catch (error) {
                        console.error("Error creating user:", error);
                        done(error as Error, false); // Cast to Error type
                    }
                } else {
                    done(null, existingUser); // User found, proceed with existing user
                }
            } catch (error) {
                console.error("Error looking up user:", error);
                done(error as Error, false); // Cast to Error type
            }
        },
    ),
);

// Serialize User: Convert Mongoose Document to plain object
passport.serializeUser(
    (user: unknown, done: (err: Error | null, id?: unknown) => void) => {
        // First, check if the user is of type IUser
        if (user && typeof user === "object" && "_id" in user) {
            const typedUser = user as IUser; // Assert that user is of type IUser

            // Check if _id is actually a valid ObjectId (if using MongoDB)
            if (typedUser._id && typeof typedUser._id.toString === "function") {
                done(null, typedUser._id.toString()); // Convert ObjectId to string
            } else {
                done(new Error("Invalid _id in user object"), null);
            }
        } else {
            done(new Error("Invalid user object"), null);
        }
    },
);

// Deserialize the user from the session
passport.deserializeUser(
    async (
        id: string,
        done: (err: Error | null, user?: IUser | null) => void,
    ) => {
        try {
            const user = await User.findById(id).exec();
            if (user) {
                console.log("Deserialized user:", user);
                done(null, user as IUser);
            } else {
                console.error("User not found during deserialization");
                done(new Error("User not found"), null);
            }
        } catch (err) {
            console.error("Error during deserialization:", err);
            done(err instanceof Error ? err : new Error("Unknown error"), null);
        }
    },
);

export default passport;
