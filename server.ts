import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import "./config/passport";
import router from "./routes/index";
import { InitializeDatabase } from "./db/connection";
import swaggerUi from "swagger-ui-express";
import { generateSwaggerDocs } from "./swagger";
import swaggerDocument from "./swagger.json"; 

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

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Initialize the database and generate Swagger docs before starting the server
generateSwaggerDocs()  
  .then(() => {
    InitializeDatabase()
      .then(() => {
        app.listen(port, () => {
          console.log(`Server is running on ${host}:${port}`);
          console.log(`Swagger Docs available at http://${host}:${port}/api-docs`);
        });
      })
      .catch((error: Error) => {
        console.error("Error initializing database:", error);
      });
  })
  .catch((error: Error) => {
    console.error("Error generating Swagger docs:", error);
  });