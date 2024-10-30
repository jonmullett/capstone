const { client } = require("./client");
const uuid = require("uuid");

const createReview = async ({
  userId,
  businessId,
  businessrating,
  reviewcomments,
}) => {
  try {
    const SQL = `INSERT INTO reviews(id, userid, businessid, businessrating, reviewcomments) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const {
      rows: [result],
    } = await client.query(SQL, [
      uuid.v4(),
      userId,
      businessId,
      businessrating,
      reviewcomments,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getReviews = async (id) => {
  try {
    const SQL = `SELECT * FROM reviews WHERE id=$1`;
    const {
      rows: [result],
    } = await client.query(SQL, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getUsersReviews = async (userId) => {
  try {
    const SQL = `SELECT businessrating, reviewcomments, businessName, businessId FROM reviews JOIN businesses ON reviews.businessId=businesses.id WHERE userid=$1`;

    const { rows } = await client.query(SQL, [userId]);
    if (!rows) return;
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getBusinessesReviews = async (businessId) => {
  try {
    const SQL = `SELECT * FROM reviews WHERE businessid=$1`;

    const { rows } = await client.query(SQL, [businessId]);
    if (!rows) return;
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createReview,
  getReviews,
  getUsersReviews,
  getBusinessesReviews,
};
