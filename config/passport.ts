/* eslint-disable no-console */
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import env from "dotenv";
import { User, IUser } from "../models/user"; // Importing User model and IUser type
import { Profile } from "passport";
import { ObjectId } from "mongodb";

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
                let user = await User.findOne({
                    googleId: profile.id,
                }).exec();

                // If user doesn't exist, create a new user
                if (user == null) {
                    user = await new User({
                        name: profile.displayName,
                        email: profile.emails ? profile.emails[0].value : "",
                        googleId: profile.id,
                        type: "client",
                    }).save();
                }

                return done(null, user);
            } catch (error) {
                console.error("Error looking up user:", error);
                return done(error as Error, false); // Cast to Error type
            }
        },
    ),
);

passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    const userId = (user as IUser)._id as ObjectId;
    done(null, userId.toString());
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).exec();
    console.log("Deserializing user ID:", id);
    done(null, user);
});

export default passport;
