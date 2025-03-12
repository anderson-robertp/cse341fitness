import env from "dotenv";
import { InitializeDatabase } from "./db/connection.ts";
import { Request, Response, NextFunction } from "express";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.ts";
import passport from "passport";
import session from "express-session";
import "./config/passport.ts";
import swaggerDocs from "./docs/swagger.ts";

env.config({ path: "cse341fitness/.env" });

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

//Middleware
//Express Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Swagger Documentation
swaggerDocs(app);

//Get the router
app
  .use(express.json())
  .use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", router);

//Initialize the database
InitializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${host}:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Error initializing database:", error);
  });
