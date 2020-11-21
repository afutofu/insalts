const User = require("../models/User");
const Salt = require("../models/Salt");
const UserSalt = require("../models/UserSalt");
const Post = require("../models/Post");

const setAssociations = function () {
  Salt.belongsToMany(User, { as: "members", through: UserSalt });
  User.belongsToMany(Salt, { as: "joinedSalts", through: UserSalt });
  Post.belongsTo(Salt);
  Post.belongsTo(User);
};

module.exports = setAssociations;
