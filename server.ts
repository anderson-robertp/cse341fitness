import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import "./config/passport";
import router from "./routes/index";
import { InitializeDatabase } from "./db/connection";
import swaggerDocs from "./docs/swagger";

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

//Middleware
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

// Register routes
app.use("/", router);




//Initialize the database
InitializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${host}:${port}`);

       //Swagger Documentation
        swaggerDocs(app);
    });
  })
  .catch((error: Error) => {
    console.error("Error initializing database:", error);
  });

 