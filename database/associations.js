const User = require("../models/User");
const Salt = require("../models/Salt");

const setAssociations = function () {
  Salt.belongsToMany(User, { as: "members", through: "User_Salt" });
  User.belongsToMany(Salt, { as: "joinedSalts", through: "User_Salt" });
};

module.exports = setAssociations;
