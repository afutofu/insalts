const db = require("../database/database");

const UserSalt = db.define("user_salt", {});

module.exports = UserSalt;
