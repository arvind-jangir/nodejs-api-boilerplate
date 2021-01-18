import { Router } from "express";
import formidableMiddleware from "express-formidable";
import {
  googleAuth,
  googleAuthCallback,
} from "../services/authentication/google.auth";
import {
  githubAuth,
  githubAuthCallback,
} from "../services/authentication/github.auth";
import {
  twitterAuth,
  twitterAuthCallback,
} from "../services/authentication/twitter.auth";
import {
  facebookAuth,
  facebookAuthCallback,
} from "../services/authentication/facebook.auth";
import {
  linkedinAuth,
  linkedinAuthCallback,
} from "../services/authentication/linkedin.auth";
import { Joi, validate } from "express-validation";
import { loginValidation } from "../modules/auth/auth.validation";
import profileUploadMiddleware from "../modules/user/profile-upload.middleware";

const routes = new Router();

routes.get("/google-login", googleAuth);
routes.get("/google-login/callback", googleAuthCallback, function (req, res) {
  res.json({ user: req.user.profile, token: req.user.token });
});

routes.get("/facebook-login", facebookAuth);
routes.get(
  "/facebook-login/callback",
  facebookAuthCallback,
  function (req, res) {
    res.json({ user: req.user.profile, token: req.user.token });
  }
);

routes.get("/github-login", githubAuth);
routes.get("/github-login/callback", githubAuthCallback, function (req, res) {
  res.json({ user: req.user.profile, token: req.user.token });
});

routes.get("/twitter-login", twitterAuth);
routes.get("/twitter-login/callback", twitterAuthCallback, function (req, res) {
  res.json({ user: req.user });
});

routes.get("/linkedin-login", linkedinAuth);
routes.get(
  "/linkedin-login/callback",
  linkedinAuthCallback,
  function (req, res) {
    res.json({ user: req.user });
  }
);

routes.post("/login", formidableMiddleware({ multiples: true }), (req, res) => {
  console.log(req.files);
  res.json({ fields: req.fields, files: req.files, body: req.body });
});

routes.post("/register", (req, res) => {
  console.log(req.files);
  res.json({ fields: req.fields, files: req.files, body: req.body });
});

export default routes;
