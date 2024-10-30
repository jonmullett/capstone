const express = require("express");
const router = express.Router();

const { requireUser } = require("./utils");

const { getUsersReviews, findUserById } = require("../db");

const { getBusinessesReviews, findBusinessById } = require("../db");
const { default: BusinessDetails } = require("../../client/src/pages/BusinessDetails");

router.get("/", async (req, res, next) => {
  try {
    res.send(await getBusinessesReviews(BusinessDetails));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
