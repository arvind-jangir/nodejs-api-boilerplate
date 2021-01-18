import passport from "passport";
import dotenv from "dotenv";
import url from "url";
import { Strategy } from "passport-github";

dotenv.config();

const strategy = new Strategy(
  {
    clientID: process.env.GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
    callbackURL: url.resolve(
      process.env.APPLICATION_HOST_URL,
      process.env.GITHUB_APP_REDIRECT_URL
    ),
  },
  function (token, tokenSecret, profile, done) {
    done(null, { profile, token });
  }
);

passport.use(strategy);

export const githubAuth = passport.authenticate("github", {
  scope: ["user", "repo"],
  accessType: "offline",
  approvalPrompt: "force",
});
export const githubAuthCallback = passport.authenticate("github", {
  failureRedirect: "/login",
  session: false,
});
