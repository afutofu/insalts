require("dotenv/config");
const jwt = require("jsonwebtoken");

/*
isLoggedIn

Checks if the user is logged in
Uses jwt verification 
*/
const isLoggedIn = (req, res, next) => {
  // Get token from headers
  const token = req.header("x-auth-token");

  // If token does not exist, return error
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If error exists, means token is invalid, return error
    if (err) return res.status(400).json({ msg: "Token is invalid" });

    // Assign decoded information to req.user
    req.user = decoded;
    next();
  });
};

module.exports = isLoggedIn;
