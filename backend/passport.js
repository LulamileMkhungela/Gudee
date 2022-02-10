const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");


FACEBOOK_APP_ID = "3198980513669068";
FACEBOOK_APP_SECRET = "b5bd5c415e10f85717c091124553963b";



passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });