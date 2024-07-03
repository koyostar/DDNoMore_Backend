const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    }
    if (!username) {
      return res.status(400).json({
        error: "Username is required",
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
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({
        error: "Username is taken already",
      });
    }

    const user = await User.create({
      name,
      username,
      email,
      password,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        error: "No user found",
      });
    }
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({
        error: "Password incorrect",
      });
    } else {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          name: user.name,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            console.error("JWT signing error:", err);
            return res.status(500).json({ error: "Failed to authenticate" });
          }
          res
            .cookie("token", token, { httpOnly: true, secure: true })
            .json(user);
        }
      );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getProfile = (req, res) => {
  res.json(req.user);
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

const updateProfile = async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, username, email },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to change password" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  updateProfile,
  changePassword,
};
