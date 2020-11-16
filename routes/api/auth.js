const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("dotenv/config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route   POST /api/auth
// @desc    Authenticate user / Login
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
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
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id, (err, foundUser) => {
    if (err) return res.status(400).json({ msg: "Cannot find user" });

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
          },
        });
      }
    );
  });
});

module.exports = router;
