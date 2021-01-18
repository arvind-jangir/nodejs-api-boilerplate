import passport from "passport";
import dotenv from "dotenv";
import url from "url";
import { Strategy } from "passport-twitter";

dotenv.config();

const strategy = new Strategy(
  {
    consumerKey: process.env.TWITTER_APP_CLIENT_ID,
    consumerSecret: process.env.TWITTER_APP_CLIENT_SECRET,
    callbackURL: url.resolve(
      process.env.APPLICATION_HOST_URL,
      process.env.TWITTER_APP_REDIRECT_URL
    ),
    includeEmail: true,
  },
  function (token, tokenSecret, profile, done) {
    done(null, profile);
  }
);

passport.use(strategy);

export const twitterAuth = passport.authenticate("twitter", {
  scope: ["user", "repo"],
  accessType: "offline",
  approvalPrompt: "force",
  session: false,
});
export const twitterAuthCallback = passport.authenticate("twitter", {
  failureRedirect: "/login",
  session: false,
});
