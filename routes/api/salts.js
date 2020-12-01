const express = require("express");
const router = express.Router({ mergeParams: true });
const validator = require("validator");

const isLoggedIn = require("../../middleware/isLoggedIn");
const isUserJoined = require("../../middleware/isUserJoined");

const Salt = require("../../models/Salt");
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route   GET /api/salts
// @desc    Get all salts
// @access  Public
router.get("/", (req, res) => {
  // Find all salts based on descending updatedAt
  // Meaning order salts where newest updated post will be placed first
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

// @route   GET /api/salts/:saltName
// @desc    Get one salt
// @access  Public
router.get("/:saltName", (req, res) => {
  const { saltName } = req.params;

  // Find salt in database
  Salt.findByPk(saltName)
    .then((foundSalt) => {
      // If salt does not exist, return error
      if (!foundSalt)
        return res.status(400).json({ msg: "Salt does not exist" });

      // Find all posts with given primary key 'saltName'
      Post.findAll({
        where: { saltName },
        include: {
          model: User,
          attributes: ["username"],
        },
      })
        .then((allSaltPosts) => {
          // Convert found salt to JSON object
          // Attach posts property having the value of all the posts in the salt
          foundSalt = foundSalt.toJSON();
          foundSalt.posts = allSaltPosts;

          // Send found salt
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

// @route   POST /api/salts
// @desc    Create a new salt
// @access  Private
router.post("/", isLoggedIn, (req, res) => {
  const { name, title, description } = req.body;
  const userId = req.user.id;

  // Server side validation
  const saltData = {
    name,
    title,
  };

  let saltDataErrors = {
    name: "",
    title: "",
  };

  // Check if name is alpha
  if (name && !validator.isAlpha(name)) {
    saltDataErrors.name = "Must only contain letters";
  }

  // Check if title is alphanumeric
  if (!validator.isAlphanumeric(validator.blacklist(title, " "))) {
    saltDataErrors.title = "Must only contain letters and numbers";
  }

  // Check if any fields are empty
  for (const key in saltData) {
    if (validator.isEmpty(saltData[key])) {
      saltDataErrors[key] = "Field must not be empty";
    }
  }

  let isValidated = true;

  // Check if there are any errors
  for (const field in saltDataErrors) {
    if (!validator.isEmpty(saltDataErrors[field])) {
      isValidated = false;
    }
  }

  // Send errors back to client if exists
  if (!isValidated) {
    return res.status(400).json({
      type: "VALIDATION",
      errors: { ...saltDataErrors },
    });
  }

  // Find one post based on name
  Salt.findOne({
    where: {
      name,
    },
  })
    .then((foundSalt) => {
      // If post does not exist, return error
      if (foundSalt)
        return res.status(400).json({ msg: "Salt name already exists" });

      // Create a new salt in the database
      Salt.create({
        name,
        title,
        description,
      })
        .then(async (newSalt) => {
          // Add user (request sender) as a new member to the new salt
          await newSalt.addMember(userId);

          // Send new salt
          res.send(newSalt);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   POST /api/salts/:saltName/edit
// @desc    Edit a salt
// @access  Private
router.patch("/:saltName/edit", isUserJoined, (req, res) => {
  const { title, description } = req.body;
  const { saltName } = req.params;

  // Server side validation
  const saltData = {
    title,
  };

  let saltDataErrors = {
    title: "",
  };

  // Check if title is alphanumeric
  if (!validator.isAlphanumeric(validator.blacklist(title, " "))) {
    saltDataErrors.title = "Must only contain letters and numbers";
  }

  // Check if any fields are empty
  for (const key in saltData) {
    if (validator.isEmpty(saltData[key])) {
      saltDataErrors[key] = "Field must not be empty";
    }
  }

  let isValidated = true;

  // Check if there are any errors
  for (const field in saltDataErrors) {
    if (!validator.isEmpty(saltDataErrors[field])) {
      isValidated = false;
    }
  }

  // Send errors back to client if exists
  if (!isValidated) {
    return res.status(400).json({
      type: "VALIDATION",
      errors: { ...saltDataErrors },
    });
  }

  // Find salt by primary key 'saltName'
  Salt.findByPk(saltName)
    .then((foundSalt) => {
      // If post does not exist, return error
      if (foundSalt)
        return res.status(400).json({ msg: "Salt name already exists" });

      // Set the title and description to the new information
      foundSalt.title = title;
      foundSalt.description = description;

      // Save salt to the database
      foundSalt
        .save()
        .then((updatedSalt) => {
          // Fetch all posts of the salt
          Post.findAll({
            where: { saltName },
            include: {
              model: User,
              attributes: ["username"],
            },
          })
            .then((allSaltPosts) => {
              // Convert found salt to JSON object
              // Attach posts property having the value of all the posts in the salt
              updatedSalt = updatedSalt.toJSON();
              updatedSalt.posts = allSaltPosts;

              // Send updated salt
              res.status(200).send(updatedSalt);
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

// @route   DELETE /api/salts/:saltName
// @desc    Delete a salt
// @access  Private
router.delete("/:saltName", isUserJoined, (req, res) => {
  const { saltName } = req.params;

  // Find salt to be deleted by primary key 'saltName'
  Salt.findByPk(saltName)
    .then((foundSalt) => {
      // If post does not exist, return error
      if (foundSalt)
        return res.status(400).json({ msg: "Salt name already exists" });

      // Destory salt and send back the found salt
      foundSalt
        .destroy()
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

// @route   PATCH /api/salts/:saltName/join
// @desc    User joins a salt
// @access  Private
router.patch("/:saltName/join", isLoggedIn, (req, res) => {
  const { saltName } = req.params;
  const userId = req.user.id;

  // Find one salt based on name
  Salt.findOne({ where: { name: saltName } })
    .then((foundSalt) => {
      // If salt does not exist, return error
      if (!foundSalt)
        return res.status(400).json({ msg: "Salt does not exist" });

      // Add user (request sender) as a new member to the salt
      foundSalt
        .addMember(userId)
        .then((updatedSalt) => {
          // Send updated salt
          res.status(200).send(updatedSalt);
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
router.patch("/:saltName/leave", isUserJoined, (req, res) => {
  const { saltName } = req.params;
  const userId = req.user.id;

  // Find salt based on name
  Salt.findOne({ where: { name: saltName } })
    .then(async (foundSalt) => {
      // If salt does not exist, return error
      if (!foundSalt)
        return res.status(400).json({ msg: "Salt does not exist" });

      // Remove user (request sender) from salt members
      foundSalt
        .removeMember(userId)
        .then(() => {
          // Get members of the salt
          foundSalt
            .getMembers()
            .then((members) => {
              // If members length <= 0, destory the salt
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
