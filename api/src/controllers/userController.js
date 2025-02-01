const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name,email and password are required" });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email formate" });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already is in use" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const image_url =
      image ||
      "https://pics.craiyon.com/2023-06-26/b9b1a22a02414687a6ee21564052117f.webp";

    const user = new User({
      name,
      email,
      password: hashedPassword,
      image: image_url,
      admin: false,
    });
    await user.save();

    res.status(200).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the user",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid user or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        image: user.image,
        name: user.name,
        admin: user.admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.status(200).json({
      message: "Login successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        image: user.image,
      },
    });
  } catch (error) {}
};

module.exports = {
  register,
  login,
};
