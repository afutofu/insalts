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

  joinedSalts: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      return this.getDataValue("members").split(";");
    },
    set(userId) {
      this.setDataValue("members", userId.join(";"));
    },
  },

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
