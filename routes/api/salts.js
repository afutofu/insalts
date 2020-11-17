const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const Salt = require("../../models/Salt");

// @route   POST /api/salts
// @desc    Create a new salt
// @access  Private
router.post("/", auth, (req, res) => {
  res.send("salts post route");
});

module.exports = router;
