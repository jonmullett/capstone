const express = require("express");
const router = express.Router();

const { requireUser } = require("./utils");

const { getUsersReviews, findUserById } = require("../db");

const { getBusinessesReviews, findBusinessById } = require("../db");
const { default: UserDetails } = require("../../client/src/pages/UserDetails");

router.get("/", async (req, res, next) => {
  try {
    res.send(await getUsersReviews(UserDetails));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
