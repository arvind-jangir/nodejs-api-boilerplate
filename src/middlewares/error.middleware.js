import { INTERNAL_SERVER_ERROR } from "http-status";
import { ValidationError } from "express-validation";
import PrettyError from "pretty-error";

const isDev = process.env.NODE_ENV === "development";

const errorMiddleware = (err, req, res, next) => {
  let status = err.status || INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";
  let errors = undefined;

  if (isDev) {
    const pe = new PrettyError();
    pe.skipNodeFiles();
    pe.skipPackage("express");
    console.log(pe.render(err));
  }

  if (err instanceof ValidationError) {
    status = err.statusCode;
    message = err.message;
    errors = err.details;
  }

  res.status(status).json({ status, message, errors });

  return next();
};

export default errorMiddleware;
