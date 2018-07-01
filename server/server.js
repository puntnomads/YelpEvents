const express = require("express"),
  app = express();
require("express-async-errors");
const path = require("path"),
  bodyParser = require("body-parser"),
  router = require("./router"),
  mongoose = require("mongoose"),
  passport = require("passport");
config = require("./config/main");

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const server = app.listen(config.port);
console.log("Your server is running on port " + config.port + ".");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router(app);
