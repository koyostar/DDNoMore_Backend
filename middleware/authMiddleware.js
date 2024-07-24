const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Received token:", token); // Log the token received

  if (!token) {
    console.log("Authentication failed: No token provided");
    return res.status(401).json({ error: "You are not logged in" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(401).json({ error: "Invalid token" });
    }

    console.log("Token decoded successfully:", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = { authenticate };
