import passport from "passport";
import dotenv from "dotenv";
import url from "url";
import { Strategy } from "passport-facebook";

dotenv.config();

const strategy = new Strategy(
  {
    clientID: process.env.FACEBOOK_APP_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_APP_CLIENT_SECRET,
    callbackURL: url.resolve(
      process.env.APPLICATION_HOST_URL,
      process.env.FACEBOOK_APP_REDIRECT_URL
    ),
    profileFields: ["id", "displayName", "photos", "email"],
  },
  function (token, tokenSecret, profile, done) {
    done(null, { profile, token });
  }
);

passport.use(strategy);

export const facebookAuth = passport.authenticate("facebook", {
  scope: ["user_friends"],
  accessType: "offline",
  approvalPrompt: "force",
});
export const facebookAuthCallback = passport.authenticate("facebook", {
  failureRedirect: "/login",
  session: false,
});
