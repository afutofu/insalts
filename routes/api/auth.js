const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv/config");

const isLoggedIn = require("../../middleware/isLoggedIn");

// User Model
const User = require("../../models/User");
const Salt = require("../../models/Salt");

// @route   POST /api/auth
// @desc    Authenticate user / Login
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Server side validation
  let loginDataErrors = {
    email: "",
    password: "",
  };

  // Check if email is correct format
  if (!validator.isEmail(email)) {
    loginDataErrors.email = "Incorrect format";
  }

  // Check if email field is empty
  if (validator.isEmpty(email)) {
    loginDataErrors.email = "Field must not be empty";
  }

  // Check if password field is empty
  if (validator.isEmpty(password)) {
    loginDataErrors.password = "Field must not be empty";
  }

  let isValidated = true;

  // Check if there are no errors
  for (const field in loginDataErrors) {
    if (!validator.isEmpty(loginDataErrors[field])) {
      isValidated = false;
    }
  }

  // Send errors back to client if exists
  if (!isValidated) {
    return res.status(400).json({
      type: "VALIDATION",
      errors: { ...loginDataErrors },
    });
  }

  // Check for existing user
  User.findOne({
    where: { email },
    include: { model: Salt, as: "joinedSalts" },
  }).then((foundUser) => {
    // If user is not found, return error
    if (!foundUser)
      return res
        .status(400)
        .json({ type: "NO_USER", msg: "User does not exist" });

    // Validate password
    bcrypt.compare(password, foundUser.password).then((isMatch) => {
      if (!isMatch)
        return res
          .status(400)
          .json({ type: "INVALID_CREDENTIALS", msg: "Invalid credentials" });

      // Order joined salts by last updated
      const joinedSalts = foundUser.joinedSalts.sort((salt1, salt2) => {
        var salt1Date = new Date(salt1.updatedAt);
        var salt2Date = new Date(salt2.updatedAt);

        // Descendingly order by updated date
        // If salt2Date is newer than salt1Date,
        // then it will be placed higher in the array
        return salt2Date - salt1Date;
      });

      // Sign a new jwt and return it along with user information
      jwt.sign(
        { id: foundUser.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: foundUser.id,
              username: foundUser.username,
              email: foundUser.email,
              joinedSalts: joinedSalts,
            },
          });
        }
      );
    });
  });
});

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", isLoggedIn, (req, res) => {
  const userId = req.user.id;

  // Check for user in the database
  User.findOne({
    where: { id: userId },
    include: {
      model: Salt,
      as: "joinedSalts",
    },
  })
    .then((foundUser) => {
      // If user does not exist, return error
      if (!foundUser)
        return res
          .status(400)
          .json({ type: "NO_USER", msg: "User does not exist" });

      // Order joined salts by last updated
      const joinedSalts = foundUser.joinedSalts.sort(function (salt1, salt2) {
        var salt1Date = new Date(salt1.updatedAt);
        var salt2Date = new Date(salt2.updatedAt);

        // Descendingly order by updated date
        // If salt2Date is newer than salt1Date,
        // then it will be placed higher in the array
        return salt2Date - salt1Date;
      });

      // Sign a new jwt and return it along with user information
      jwt.sign(
        { id: foundUser.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: foundUser.id,
              username: foundUser.username,
              email: foundUser.email,
              joinedSalts,
            },
          });
        }
      );
    })
    .catch(() => {
      return res.status(400).json({ type: "NO_USER", msg: "Cannot find user" });
    });
});

module.exports = router;
