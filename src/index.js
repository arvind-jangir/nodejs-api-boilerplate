import express from "express";
import session from "express-session";
import formidableMiddleware from "express-formidable";
import passport from "passport";
import chalk from "chalk";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.middleware";
import routes from "./routes";

const formidable = require("formidable");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(formidableMiddleware());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", routes);
app.use(errorMiddleware);

if (!module.parent) {
  app.listen(process.env.APPLICATION_PORT, (err) => {
    if (err) {
      console.log(chalk.red("Cannot run!"));
    } else {
      console.log(
        chalk.green.bold(
          `
        NodeJS API Boilerplate is listening on port: ${process.env.APPLICATION_PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `
        )
      );
    }
  });
}

export default app;
