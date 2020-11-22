const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

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

// @route   POST /api/posts
// @desc    Create a post
// @access  Private
router.post("/", auth, (req, res) => {
  const { title, content, saltName } = req.body;
  const userId = req.user.id;

  Post.create({
    title,
    content,
  })
    .then(async (newPost) => {
      await newPost.setSalt(saltName);
      await newPost.setUser(userId);
      res.status(200).send(newPost);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
