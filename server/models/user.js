const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true
    },
    password: { type: String },
    googleID: { type: String },
    twitterID: { type: String },
    facebookID: { type: String },
    isVerified: {
      type: Boolean,
      default: false
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function(next) {
  const user = this;
  const SALT_FACTOR = 5;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(SALT_FACTOR);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    if (isMatch) {
      return isMatch;
    }
  } catch (error) {
    return null;
  }
};

module.exports = mongoose.model("User", UserSchema);
