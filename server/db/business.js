const { client } = require("./client");

const uuid = require("uuid");

const createBusiness = async ({ businessname }) => {
  if (!businessname) {
    const error = Error("enter business name");
    error.status = 401;
    throw error;
  }
  const SQL = `
      INSERT INTO businesses(id, businessname) VALUES($1, $2) RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), businessname]);
  return response.rows[0];
};

const fetchBusinesses = async () => {
  const SQL = `
      SELECT id, businessname FROM businesses;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const findBusinessById = async (businessId) => {
  try {
    const SQL = `SELECT * FROM businesses WHERE id=$1`;
    const {
      rows: [results],
    } = await client.query(SQL, [businessId]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getBusinessReviews = async (businessById) => {
  try {
    const SQL = `SELECT * FROM users WHERE id=$1`;
    const {
      rows: [results],
    } = await client.query(SQL, [businessById]);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBusiness,
  fetchBusinesses,
  findBusinessById,
  findBusinessById,
  getBusinessReviews,
  // createBusinessReview,
};
