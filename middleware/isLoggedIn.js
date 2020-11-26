require("dotenv/config");
const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).json({ msg: "Token is invalid" });

    // Add info to req.user
    req.user = decoded;
    next();
  });
};

module.exports = isLoggedIn;
