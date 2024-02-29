"use strict";

const express = require("express");
const router = express.Router();

// controllers
const UserController = require("../controllers/user");

module.exports = function () {
  router.post("/", function (req, res, next) {
    new UserController(req, res, next).createAccount();
  });

  router.post("/comment", function (req, res, next) {
    new UserController(req, res, next).createComment();
  });

  router.post("/interaction", function (req, res, next) {
    new UserController(req, res, next).createInteraction();
  });

  return router;
};
