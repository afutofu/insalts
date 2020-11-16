const express = require("express");
const cors = require("cors");
require("dotenv/config");

const app = express();

const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DATABASE
const db = require("./config/database");

// CONNECT TO DATABASE
db.authenticate()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// START SERVER
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
