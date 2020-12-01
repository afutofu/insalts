require("dotenv/config");
const jwt = require("jsonwebtoken");

const Salt = require("../models/Salt");
const UserSalt = require("../models/UserSalt");

/*
isUserJoiend

Checks if the user is logged in and that the user is a member of the Salt
Checks if there is a field with userId and saltName in UserSalt model
*/
const isUserJoined = (req, res, next) => {
  const token = req.header("x-auth-token");
  let { saltName } = req.params;

  // If saltName not in parameters, check for saltName in body
  if (!saltName) saltName = req.body.saltName;

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).json({ msg: "Token is invalid" });

    // Check for salt in the database
    Salt.findByPk(saltName)
      .then((foundSalt) => {
        // If salt does not exist, return error
        if (!foundSalt)
          return res.status(400).json({ msg: "Salt does not exist" });

        // Check for association in UserSalt model
        UserSalt.findOne({
          where: { saltName, userId: decoded.id },
        })
          .then((foundAssociation) => {
            // If association not found, return error
            if (!foundAssociation)
              return res
                .status(401)
                .json({ msg: "User not joined, authorization denied" });

            // Add info to req.user
            req.user = decoded;
            next();
          })
          .catch(() => {
            res
              .status(500)
              .json({ msg: "Unable to retreive info from server" });
          });
      })
      .catch(() => {
        res.status(500).json({ msg: "Unable to retreive info from server" });
      });
  });
};

module.exports = isUserJoined;
