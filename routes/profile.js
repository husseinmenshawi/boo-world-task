"use strict";

const express = require("express");
const router = express.Router();

// sample data
const { profiles } = require("../sample/profile");

// controllers
const ProfileController = require("../controllers/profile");

module.exports = function () {
  router.post("/profile", function (req, res, next) {
    new ProfileController(req, res, next).createProfile();
  });

  router.get("/profile/:id", async function (req, res, next) {
    new ProfileController(req, res, next).getProfileById();
  });

  router.get("/*", function (req, res, next) {
    res.render("profile_template", {
      profile: profiles[0],
    });
  });

  return router;
};
