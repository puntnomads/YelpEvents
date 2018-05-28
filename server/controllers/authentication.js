const jwt = require("jsonwebtoken"),
  crypto = require("crypto"),
  nodemailer = require("nodemailer"),
  reCAPTCHA = require("recaptcha2"),
  User = require("../models/user"),
  config = require("../config/main");

const reCaptcha = new reCAPTCHA({
  siteKey: config.siteKey,
  secretKey: config.secretKey
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email_user,
    pass: config.email_password
  }
});

const generateResetToken = (length = 24) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString("hex"));
      }
    });
  });
};

const generateToken = user => {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080
  });
};

const setUserInfo = user => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email
  };
};

exports.login = (req, res, next) => {
  let userInfo = setUserInfo(req.user);
  res.json({
    token: "JWT " + generateToken(userInfo),
    ttl: 10080,
    created: new Date().toISOString(),
    name: userInfo.name,
    email: userInfo.email
  });
};

exports.register = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.send({ error: "Please provide all details." });
  }
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.send({ error: "That email address is already in use." });
  }
  const user = new User(req.body);
  const newUser = await user.save();
  let userInfo = setUserInfo(user);
  res.json({
    token: generateToken(userInfo),
    user: userInfo,
    info: "Account created"
  });
};

exports.forgotPassword = async (req, res, next) => {
  const validReCaptcha = await reCaptcha.validateRequest(req);
  if (validReCaptcha) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      res.json({
        error:
          "Your request could not be processed as entered. Please try again."
      });
    } else {
      const resetToken = await generateResetToken(48);
      existingUser.resetPasswordToken = resetToken;
      existingUser.resetPasswordExpires = Date.now() + 3600000;
      await existingUser.save();
      const mailOptions = {
        from: "voting-code@gmail.com",
        to: existingUser.email,
        subject: "Password Reset",
        text:
          `${"You are receiving this because you (or someone else) has requested to reset the password of your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://"}${req.headers.host}/reset-password/${resetToken}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
      await transporter.sendMail(mailOptions);
      res.json({
        info: "An email was sent to you with the link to reset your password."
      });
    }
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetUser = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!resetUser) {
    res.json({
      error:
        "Your token has expired. Please attempt to reset your password again."
    });
  }
  resetUser.password = req.body.password;
  resetUser.resetPasswordToken = undefined;
  resetUser.resetPasswordExpires = undefined;
  await resetUser.save();
  const mailOptions = {
    from: "voting-code@gmail.com",
    to: resetUser.email,
    subject: "Password Changed",
    text:
      "You are receiving this email because you changed your password. \n\n" +
      "If you did not request this change, please contact us immediately."
  };
  await transporter.sendMail(mailOptions);
  res.json({
    info: "Password changed successfully. Please login with your new password."
  });
};
