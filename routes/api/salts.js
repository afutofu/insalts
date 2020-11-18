const express = require("express");
const { model } = require("../../database/database");
const router = express.Router({ mergeParams: true });

const auth = require("../../middleware/auth");

const Salt = require("../../models/Salt");
const User = require("../../models/User");

// @route   GET /api/salts
// @desc    Get all salts
// @access  Public
router.get("/", (req, res) => {
  Salt.findAll({
    order: [["updatedAt", "DESC"]],
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
      salt.addMember(userId);
      res.send(salt);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   PATCH /api/salts/:saltName/leave
// @desc    User leaves a salt
// @access  Private
router.patch("/:saltName/leave", auth, (req, res) => {
  const { saltName } = req.params;
  const userId = req.user.id;

  Salt.findOne({ where: { name: saltName } })
    .then((salt) => {
      salt.removeMember(userId);
      if (Object.keys(salt.getMembers()).length <= 0) {
        salt
          .destroy()
          .then(() => {
            res.status(200).send(saltName);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.status(200).send(saltName);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
