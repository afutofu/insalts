const express = require("express");
const router = express.Router();

const isUserJoined = require("../../middleware/isUserJoined");
const checkPostOwnership = require("../../middleware/checkPostOwnership");

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
router.post("/", isUserJoined, (req, res) => {
  const { title, content, saltName } = req.body;
  const userId = req.user.id;

  Post.create({
    title,
    content,
  })
    .then(async (newPost) => {
      await newPost.setSalt(saltName);
      await newPost.setUser(userId);
      Post.findOne({
        where: { id: newPost.id },
        include: { model: User, attributes: ["username"] },
      })
        .then((foundPost) => {
          res.status(200).send(foundPost);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   PATCH /api/posts/:postId/edit
// @desc    Edit a post
// @access  Private
router.patch("/:postId/edit", checkPostOwnership, (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

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

      foundPost.title = title;
      foundPost.content = content;

      foundPost
        .save()
        .then((updatedPost) => {
          res.status(200).send(updatedPost);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   DELETE /api/posts/:postId/delete
// @desc    Delete a post
// @access  Private
router.delete("/:postId/delete", checkPostOwnership, (req, res) => {
  const { postId } = req.params;

  Post.findByPk(postId)
    .then((foundPost) => {
      if (!foundPost)
        return res.status(400).json({ msg: "Post does not exist" });

      foundPost
        .destroy()
        .then(() => {
          res.sendStatus(200);
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
