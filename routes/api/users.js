const express = require("express");
const router = express.Router();

const User = require("../../models/User");

// @route   POST /api/users
// @desc    Register New User
// @access  Public
router.post("/", (req, res) => {
  const { username, email, password, rePassword } = req.body;

  User.create({
    username,
    email,
    password,
  })
    .then((user) => {
      console.log(user);
      res.send("nice");
    })
    .catch((err) => {
      console.log(err);
      return res.status(500);
    });
});

module.exports = router;
