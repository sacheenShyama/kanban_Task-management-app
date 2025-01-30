const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: [true, "email is required"], unique: true },
  name: { type: String, required: [true, "name is required"] },
  image: { type: String },
  password: { type: String, required: [true, "password is required"] },
  admin: { type: Boolean },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
