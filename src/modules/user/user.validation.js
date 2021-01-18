import { Joi } from "express-validation";

export const createValidation = {
  body: Joi.object({
    firstName: Joi.string().min(3).max(20).required().messages({
      "string.empty": "First name is required!",
    }),
    lastName: Joi.string(),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required!",
      "string.email": "Please provide a valid email!",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required!",
    }),
  }),
};
