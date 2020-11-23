const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Salt = require("../../models/Salt");

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get("/", (req, res) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
    include: {
      model: User,
      attributes: ["username"],
    },
  })
    .then((allPosts) => {
      res.status(200).send(allPosts);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   GET /api/posts/:postId
// @desc    Get one post
// @access  Public
router.get("/:postId", (req, res) => {
  const { postId } = req.params;

  Post.findOne({
    where: { id: postId },
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Salt,
      },
    ],
  })
    .then((foundPost) => {
      if (!foundPost)
        return res.status(400).json({ msg: "Post does not exist" });

      res.status(200).send(foundPost);
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
