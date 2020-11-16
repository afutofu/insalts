const { DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //   createdSalts: [
  //     {
  //       type: DataTypes.INTEGER,
  //       references: {
  //         model: Salt,
  //         key: "id",
  //       },
  //     },
  //   ],
  //   joinedSalts: [
  //     {
  //       type: DataTypes.INTEGER,
  //       references: {
  //         model: Salt,
  //         key: "id",
  //       },
  //     },
  //   ],
  //   posts: [
  //     {
  //       type: DataTypes.INTEGER,
  //       references: {
  //         model: Post,
  //         key: "id",
  //       },
  //     },
  //   ],
});

module.exports = User;
