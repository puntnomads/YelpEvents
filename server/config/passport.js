const passport = require("passport"),
  User = require("../models/user"),
  config = require("./main"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  LocalStrategy = require("passport-local"),
  GoogleTokenStrategy = require("passport-google-token").Strategy,
  TwitterTokenStrategy = require("passport-twitter-token"),
  FacebookTokenStrategy = require("passport-facebook-token");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, {
          error: "Your login details could not be verified. Please try again."
        });
      }
      if (!user.isVerified) {
        return done(null, false, {
          error: "Your login details could not be verified. Please try again."
        });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, {
          error: "Your login details could not be verified. Please try again."
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

const googleStrategy = new GoogleTokenStrategy(
  {
    callbackURL: "/api/auth/google/redirect",
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleID: profile.id
        });
        const newUser = await user.save();
        done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  }
);

const twitterStrategy = new TwitterTokenStrategy(
  {
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    includeEmail: true
  },
  async (token, tokenSecret, profile, done) => {
    try {
      const existingUser = await User.findOne({ twitterID: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          twitterID: profile.id
        });
        const newUser = await user.save();
        done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  }
);

const facebookStrategy = new FacebookTokenStrategy(
  {
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ facebookID: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          facebookID: profile.id
        });
        const newUser = await user.save();
        done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  }
);

passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleStrategy);
passport.use(twitterStrategy);
passport.use(facebookStrategy);
