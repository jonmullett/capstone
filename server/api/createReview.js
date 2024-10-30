const express = require("express");
const router = express.Router();

const { requireUser } = require("./utils");

const { createReview, findBusinessById } = require("../db");

router.get("/createReview/:id", async (req, res, next) => {
  try {
    const createReviewId = req.params.id;
    const review = await findReviewById(reviewId);
    console.log(createReview);
    const reviews = await getCreateReview(reviewId);
    res.send({ review: business.reviewId, reviews });
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
