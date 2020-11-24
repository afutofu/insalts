require("dotenv/config");
const jwt = require("jsonwebtoken");

const UserSalt = require("../models/UserSalt");

const isUserJoined = (req, res, next) => {
  const token = req.header("x-auth-token");
  const { saltName } = req.params;

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).json({ msg: "Token is invalid" });

    UserSalt.findOne({
      where: { saltName, userId: decoded.id },
    })
      .then((foundUser) => {
        if (!foundUser)
          return res
            .status(401)
            .json({ msg: "User not joined, authorization denied" });

        // Add info to req.user
        req.user = decoded;
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "Unable to retreive info from server" });
      });
  });
};

module.exports = isUserJoined;
