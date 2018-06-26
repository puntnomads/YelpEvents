const AuthenticationController = require("./controllers/authentication"),
  ApiController = require("./controllers/api"),
  express = require("express"),
  path = require("path"),
  passportService = require("./config/passport"),
  passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  const apiRoutes = express.Router(),
    authRoutes = express.Router();

  apiRoutes.use("/auth", authRoutes);
  authRoutes.post("/signup", AuthenticationController.register);
  authRoutes.post("/confirmation", AuthenticationController.confirmation);
  authRoutes.post("/forgot-password", AuthenticationController.forgotPassword);
  authRoutes.post(
    "/reset-password/:token",
    AuthenticationController.resetPassword
  );
  authRoutes.post("/login", requireLogin, AuthenticationController.login);
  authRoutes.post(
    "/google",
    passport.authenticate("google-token"),
    AuthenticationController.login
  );
  authRoutes.post("/twitter/reverse", AuthenticationController.twitterReverse);
  authRoutes.post(
    "/twitter",
    AuthenticationController.twitter,
    passport.authenticate("twitter-token"),
    AuthenticationController.login
  );
  authRoutes.post(
    "/facebook",
    passport.authenticate("facebook-token"),
    AuthenticationController.login
  );

  app.use("/api", apiRoutes);
  apiRoutes.get("/search", ApiController.searchYelp);
  apiRoutes.post("/event", ApiController.saveEvent);

  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/build/index.html"));
  });

  // errors from controller functions are received here.
  app.use((error, req, res, next) => {
    console.log("error: ", error);
  });
};
