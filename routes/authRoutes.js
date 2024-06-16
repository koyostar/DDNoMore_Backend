const express = require("express");
const router = express.Router();
const { test, registerUser } = require("../controllers/authController");

router.get("/", test);
router.post("/register", registerUser);

module.exports = router;
