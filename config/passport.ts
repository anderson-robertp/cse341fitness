import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import env from "dotenv";
import { Profile } from "passport";
import { user } from "../models/user.ts";

env.config({ path: "cse341fitness" + "/.env" });

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://127.0.0.1:3000/authentication/google/callback",
      passReqToCallback: true,
    },
    async (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: Function
    ) => {
      try {
        //Find the google user
        const existingUser = await user.findOne({
          googleId: profile.id,
        });

        // If user doesn't exist creates a new user
        if (!existingUser) {
          const newUser = new user({
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : "",
            googleId: profile.id,
          });

          try {
            const createdUser = await newUser.save();
            done(null, createdUser);
          } catch (error) {
            console.log(`Error creating user: ${error}`);
            done(error, null);
          }
        } else {
          done(null, existingUser);
        }
      } catch (error) {
        console.log(`Error looking up user: ${error}`);
        done(error, null);
      }
    }
  )
);

// Store/serialize the user
passport.serializeUser((user: any, done) => {
  console.log("Serializing user:", user._id);
  done(null, user._id);
});

// Get/deserialize the user
passport.deserializeUser(async (id: string, done) => {
  try {
    const currentUser = await user.findById(id);

    if (!currentUser) {
      return done(new Error("User not found"), null);
    }

    console.log("Deserializing user:", currentUser);
    done(null, currentUser);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
