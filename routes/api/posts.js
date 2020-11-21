const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get("/", (req, res) => {
  Post.findAll()
    .then((allPosts) => {
      res.status(200).send(allPosts);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
