const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const Salt = require("../../models/Salt");

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
