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
const saltRoutes = require("./routes/api/salts");

// USE ROUTES
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/salts", saltRoutes);

// DATABASE
const db = require("./database/database");
require("./database/associations")();
db.sync();
// db.sync({ force: true });

// CONNECT TO DATABASE
db.authenticate()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// START SERVER
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
