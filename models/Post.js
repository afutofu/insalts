const { DataTypes } = require("sequelize");
const db = require("../database/database");

const Post = db.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
  },
});

module.exports = Post;
