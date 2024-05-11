const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const Profile = require("../Model/user");
require("dotenv").config();

const CLIENT_ID = "228251446019-m5s7sb877itp1bu7vrh8tp90vbnla26v.apps.googleusercontent.com";
const CLIENT_SECRET = "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";


passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },

    async function (req, accessToken, refreshToken, profile, done) {
      console.log(profile._json)
      try {
        const existingProfile = await Profile.findOne({ google_id: profile.id });
        if (!existingProfile) {
          const newProfile = new Profile({
            google_id: profile.id,
            User_Name: profile.displayName,
            Email: profile.email,
          });
          await newProfile.save();
          return done(null, { profile: newProfile });
        } else {
          return done(null, { profile: existingProfile });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
