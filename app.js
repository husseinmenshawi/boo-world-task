"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const db = require("./config/db");

const bodyParser = require("body-parser");

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// set the view engine to ejs
app.set("view engine", "ejs");

// routes
app.use("/profile", require("./routes/profile")());
app.use("/user", require("./routes/user")());

// start server
app.listen(port);
// connect to MongoDB
db.then(() => {
  console.log("MongoDB connected");
}).catch((error) => {
  console.log("MongoDB connection error: ", error);
});
console.log("Express started. Listening on %s", port);
