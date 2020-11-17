const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const Salt = require("../../models/Salt");
const User = require("../../models/User");

// @route   POST /api/salts
// @desc    Create a new salt
// @access  Private
router.post("/", auth, (req, res) => {
  const { name, title, description } = req.body;
  const userId = req.user.id;

  User.findByPk(userId)
    .then((foundUser) => {
      if (!foundUser)
        return res
          .status(400)
          .json({ type: "NO_USER", msg: "User does not exist" });

      foundUser.joinedSalts = [name];
      foundUser
        .save()
        .then((newUser) => {
          Salt.create({
            name,
            title,
            description,
            members: [userId],
          })
            .then((newSalt) => {
              res.json({ newSalt, newUser });
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
