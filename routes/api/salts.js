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
    .then((newSalt) => {
      newSalt.addMember(userId);
      res.send(newSalt);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   PATCH /api/salts/:saltName/join
// @desc    User joins a salt
// @access  Private
router.patch("/:saltName/join", auth, (req, res) => {
  const { saltName } = req.params;
  const userId = req.user.id;

  Salt.findOne({ where: { name: saltName } })
    .then((foundSalt) => {
      foundSalt
        .addMember(userId)
        .then(() => {
          res.status(200).send(foundSalt);
        })
        .catch((err) => {
          console.log(err);
        });
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
    .then((foundSalt) => {
      foundSalt
        .removeMember(userId)
        .then(() => {
          foundSalt
            .getMembers()
            .then((members) => {
              if (members.length <= 0) {
                foundSalt
                  .destroy()
                  .then(() => {
                    res.status(200).send(null);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                res.status(200).send(foundSalt);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
