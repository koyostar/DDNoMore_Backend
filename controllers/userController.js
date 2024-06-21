const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./../models/users");

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

async function registerUser(req, res) {
  try {
    const { name, username, email, password } = req.body;

    username = username.toLowerCase().replace(" ", "");
    email = email.toLowerCase();

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be at least 6 characters long" });
    }

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({ error: "Username is taken already" });
    }

    const user = await User.create({
      name,
      username,
      email,
      password,
    });

    const newUser = await user.save();

    const token = createJWT(newUser);
    res.status(201).json({ token });
  } catch (err) {
    console.log("debug", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    console.log("Received req.body:", req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    username = username.toLowerCase();

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        error: "No user found",
      });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        error: "Password incorrect",
      });
    } else {
      const token = createJWT(user);
      res.json({ token });
    }
  } catch (error) {
    console.error("Login error:", error); // Log the error
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
}

async function getProfile(req, res) {
  console.log("Fetching profile for user:", user); // Log user info

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json(req.user);
}

module.exports = { registerUser, loginUser, logoutUser, getProfile };
