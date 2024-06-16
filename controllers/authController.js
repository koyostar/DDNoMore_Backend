const User = require("../models/users");
const bcrypt = require("bcrypt");

const test = (req, res) => {
  res.json("test is working");
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Password is required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password should be at least 6 characters long",
      });
    }
    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        error: "Email is taken already",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = { test, registerUser };
