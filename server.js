const express = require("express");
const cors = require("cors");
require("dotenv/config");

const app = express();

const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// IMPORT ROUTES
const userRoutes = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");

// USE ROUTES
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// DATABASE
const db = require("./config/database");
db.sync();

// CONNECT TO DATABASE
db.authenticate()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// START SERVER
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
