const express = require("express");
const { model } = require("../../database/database");
const router = express.Router();

const auth = require("../../middleware/auth");

const Salt = require("../../models/Salt");
const User = require("../../models/User");

// @route   GET /api/salts
// @desc    Get all salts
// @access  Public
router.get("/", (req, res) => {
  Salt.findAll({
    include: {
      model: User,
      as: "members",
      attributes: {
        exclude: ["password"],
      },
    },
  })
    .then((salts) => {
      res.status(200).send(salts);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   POST /api/salts
// @desc    Create a new salt
// @access  Private
router.post("/", auth, (req, res) => {
  const { name, title, description } = req.body;
  const userId = req.user.id;

  Salt.create({
    name,
    title,
    description,
  })
    .then((salt) => {
      salt.addMembers(userId);
      res.send(salt);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
