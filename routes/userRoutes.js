const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/userController");

const ensureLoggedIn = require("../config/ensureLoggedIn");

router.post("/register", registerUser);
router.post("/login", async (req, res) => {
  try {
    console.log("Received login request:", req.body); // Log request body
    const result = await loginUser(req.body); // Call controller function
    console.log("Login successful:", result); // Log successful result
    res.status(200).json(result); // Send JSON response
  } catch (error) {
    console.error("Login failed:", error); // Log error if login fails
    res.status(500).json({ error: error.message }); // Send error response
  }
});
router.post("/logout", logoutUser);
router.get("/profile", ensureLoggedIn, async (req, res) => {
  try {
    console.log("Fetching user profile for:", req.user); // Log user info
    const result = await getProfile(req.user); // Call controller function
    console.log("Profile fetched successfully:", result); // Log successful result
    res.status(200).json(result); // Send JSON response
  } catch (error) {
    console.error("Failed to fetch profile:", error); // Log error if profile fetch fails
    res.status(500).json({ error: error.message }); // Send error response
  }
});
module.exports = router;
