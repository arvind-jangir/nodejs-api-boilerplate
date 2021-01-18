import { Joi, validate } from "express-validation";

export const loginValidation = validate(
  {
    body: Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required!",
        "any.required": "Email is required!",
        "string.email": "Please provide a valid email!",
      }),
      password: Joi.string().required().messages({
        "any.required": "Password is required!",
        "string.empty": "Password is required!",
      }),
    }),
  },
  { keyByField: true },
  { abortEarly: false }
);
