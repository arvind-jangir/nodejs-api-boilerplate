import passport from "passport";
import dotenv from "dotenv";
import url from "url";
import { Strategy } from "passport-linkedin-oauth2";

dotenv.config();

const strategy = new Strategy(
  {
    clientID: process.env.LINKEDIN_APP_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_APP_CLIENT_SECRET,
    callbackURL: url.resolve(
      process.env.APPLICATION_HOST_URL,
      process.env.LINKEDIN_APP_REDIRECT_URL
    ),
    scope: ["r_emailaddress", "r_liteprofile"],
    state: true,
  },
  function (token, tokenSecret, profile, done) {
    done(null, { profile, token });
  }
);

passport.use(strategy);

export const linkedinAuth = passport.authenticate("linkedin", {
  accessType: "offline",
  approvalPrompt: "force",
});
export const linkedinAuthCallback = passport.authenticate("linkedin", {
  failureRedirect: "/login",
  session: false,
});
