const express = require("express");
const router = express.Router();
const validator = require("validator");

const User = require("../../models/User");

// @route   POST /api/users
// @desc    Register New User
// @access  Public
router.post("/", (req, res) => {
  const { username, email, password, rePassword } = req.body;

  let registerDataError = {
    username: "",
    email: "",
    password: "",
    rePassword: "",
  };

  // Check if username is at least 4 characters long
  if (!validator.isLength(username, { min: 4 })) {
    registerDataError.username = "Must be at least 4 characters long";
  }

  // Check if username is alphanumeric
  if (!validator.isAlphanumeric(username)) {
    registerDataError.username = "Must only contain letters and numbers";
  }

  // Check if email is correct format
  if (!validator.isEmail(email)) {
    registerDataError.email = "Incorrect format";
  }

  // Check if password is at least 6 characters long
  if (!validator.isLength(password, { min: 6 })) {
    registerDataError.password = "Must be at least 6 characters long";
  }

  // Check if rePassword is same as password
  if (!validator.equals(rePassword, password)) {
    registerDataError.rePassword = "Password does not match";
  }

  let fields = [username, email, password, rePassword];

  // Check if any fields are empty
  for (const field in fields) {
    if (validator.isEmpty(field)) {
      registerDataError[key] = "Field must not be empty";
    }
  }

  User.findOne({ where: { email } })
    .then((foundUser) => {
      if (foundUser) {
        registerDataError.email = "Email already taken";
      }

      let isValidated = true;

      // Check if there are no errors
      for (const field in registerDataError) {
        if (!validator.isEmpty(registerDataError[field])) {
          isValidated = false;
        }
      }

      if (!isValidated) {
        return res.status(400).json({
          error_type: "VALIDATION",
          errors: { ...registerDataError },
        });
      }

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
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
