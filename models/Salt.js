const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Salt = db.define("salt", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  members: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue("members").split(";");
    },
    set(userId) {
      this.setDataValue("members", userId.join(";"));
    },
  },
});

module.exports = Salt;
