import passport from "passport";
import dotenv from "dotenv";
import url from "url";
import { OAuth2Strategy } from "passport-google-oauth";

dotenv.config();

const strategy = new OAuth2Strategy(
  {
    clientID: process.env.GOOGLE_APP_CLIENT_ID,
    clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET,
    callbackURL: url.resolve(
      process.env.APPLICATION_HOST_URL,
      process.env.GOOGLE_APP_REDIRECT_URL
    ),
  },
  function (token, tokenSecret, profile, done) {
    done(null, { profile, token });
  }
);

passport.use(strategy);

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email", "https://www.googleapis.com/auth/spreadsheets"],
  accessType: "offline",
  approvalPrompt: "force",
});
export const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/login",
  session: false,
});
