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
  Salt.findByPk(saltName)
    .then((foundSalt) => {
      if (!foundSalt)
        return res.status(400).json({ msg: "Salt does not exist" });

      Post.findAll({
        where: { saltName },
        include: {
          model: User,
          attributes: ["username"],
        },
      })
        .then((allSaltPosts) => {
          foundSalt = foundSalt.toJSON();
          foundSalt.posts = allSaltPosts;

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

  Salt.findByPk(saltName)
    .then((foundSalt) => {
      foundSalt.title = title;
      foundSalt.description = description;
      foundSalt
        .save()
        .then((updatedSalt) => {
          Post.findAll({
            where: { saltName },
            include: {
              model: User,
              attributes: ["username"],
            },
          })
            .then((allSaltPosts) => {
              updatedSalt = updatedSalt.toJSON();
              updatedSalt.posts = allSaltPosts;

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

  Salt.findByPk(saltName)
    .then((foundSalt) => {
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
router.patch("/:saltName/leave", isUserJoined, (req, res) => {
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
