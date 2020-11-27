const express = require("express");
const path = require("path");
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
const postRoutes = require("./routes/api/posts");

// USE ROUTES
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/salts", saltRoutes);
app.use("/api/posts", postRoutes);

// CONNECT TO DATABASE
const db = require("./database/database");
require("./database/associations")();
db.sync();
// db.sync({ force: true });

// TESTING DATABASE CONNECTION
db.authenticate()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// SERVE STATIC ASSETS IF IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// START SERVER
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
