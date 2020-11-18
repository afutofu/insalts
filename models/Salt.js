const { DataTypes } = require("sequelize");
const db = require("../database/database");

const Salt = db.define("Salt", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Salt;
