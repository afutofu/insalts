require("dotenv/config");
const jwt = require("jsonwebtoken");

const Post = require("../models/Post");

/*
checkPostOwnership

Checks if the user is logged in and that the user created the post
Checks for the userId in Post model with the user id sent by jwt
*/
const checkPostOwnership = (req, res, next) => {
  const token = req.header("x-auth-token");
  const { postId } = req.params;

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).json({ msg: "Token is invalid" });

    // Check for post in the database
    Post.findByPk(postId)
      .then((foundPost) => {
        // If post does not exist, return error
        if (!foundPost)
          return res.status(400).json({ msg: "Post does not exist" });

        // If Post userId does not match decoded id, return error
        // Meaning if the user sending the request is not the user who created the post
        if (foundPost.userId !== decoded.id)
          return res.status(401).json({ msg: "User does not own post" });

        // Add info to req.user
        req.user = decoded;
        next();
      })
      .catch(() => {
        res.status(500).json({ msg: "Unable to retreive info from server" });
      });
  });
};

module.exports = checkPostOwnership;
