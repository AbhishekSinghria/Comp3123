const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is mandatory."],
    maxlength: [20, "Username must not exceed 20 characters."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    maxlength: [20, "Password must not exceed 20 characters."],
  },
  email: {
    type: String,
    maxlength: [20, "Email must not exceed 20 characters."],
    unique: true,
  },
});

UserSchema.methods.checkPassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return error;
  }
}

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
