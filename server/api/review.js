const express = require("express");
const router = express.Router();

const { requireUser } = require("./utils");

const {
  getUsersReviews,
  findUserById,
  getBusinessesReviews,
  findBusinessById,
  createReview,
  fetchUsers,
  fetchBusinesses,
} = require("../db");

router.get("/user/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await findUserById(userId);
    console.log(user);

    const businesses = await fetchBusinesses();
    const reviews = await getUsersReviews(userId);
    const reviewsWithBusinessnames = reviews.map((review) => {
      console.log("REVIEW", review);
      const result = businesses.find(
        (business) => business.id === review.businessid
      );
      console.log("RESULT", result);

      return { ...review, businessname: result.businessname };
    });
    res.send({
      user: user.username,
      reviews: reviewsWithBusinessnames,
    });
  } catch (ex) {
    next(ex);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const reviews = await createReview(req.body);
    res.send(reviews);
  } catch (ex) {
    next(ex);
  }
});

router.get("/business/:id", async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const business = await findBusinessById(businessId);
    console.log(business);
    const users = await fetchUsers();
    const reviews = await getBusinessesReviews(businessId);
    const reviewsWithUsernames = reviews.map((review) => {
      const result = users.find((user) => user.id === review.userid);
      console.log("RESULT", result);

      return { ...review, username: result.username };
    });
    res.send({
      business: business.businessname,
      reviews: reviewsWithUsernames,
    });
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
