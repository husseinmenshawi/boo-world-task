"use strict";

const express = require("express");
const router = express.Router();

// controllers
const ProfileController = require("../controllers/profile");

module.exports = function () {
  router.post("/", function (req, res, next) {
    new ProfileController(req, res, next).createProfile();
  });

  router.get("/comments", async function (req, res, next) {
    new ProfileController(req, res, next).getProfileComments();
  });

  router.get("/:id", async function (req, res, next) {
    new ProfileController(req, res, next).getProfileById();
  });

  router.get("/:id/render", async function (req, res, next) {
    const profile = await new ProfileController(
      req,
      res,
      next
    ).getProfileForRender();

    res.render("profile_template", {
      profile,
    });
  });

  return router;
};
