const { client } = require("./client");

const {
  createUser,
  fetchUsers,
  createBusiness,
  fetchBusinesses,
  createReview,
  getReviews,
  getUsersReviews,
  getBusinessesReviews,
} = require("./index.js");

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS businesses CASCADE;
    DROP TABLE IF EXISTS reviews CASCADE;
    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE businesses(
      id UUID PRIMARY KEY,
      businessname VARCHAR(64) UNIQUE NOT NULL
    );
    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      businessrating INT NOT NULL,
      reviewcomments VARCHAR(1024) NOT NULL,
      userId UUID REFERENCES users(id) NOT NULL,
      businessId UUID REFERENCES businesses(id) NOT NULL
    );
  `;
  await client.query(SQL);
};

const init = async () => {
  await client.connect();
  console.log("connected to database");

  await createTables();
  console.log("tables created");

  const [AcmePizza, MoesTypewriterRepair, LucysCandyShop, MarysFineWines,] = await Promise.all([
    createBusiness({ businessname: "Acme Pizza" }),
    createBusiness({ businessname: "Moe's Typewriter Repair" }),
    createBusiness({ businessname: "Lucy's Candy Shop" }),
    createBusiness({ businessname: "Mary's Fine Wines" }),
  ]);
  console.log(await fetchBusinesses());
  // client.end();

  const [moe, lucy, curly, alexander, eleven, ethyl, dustin, mike] =
    await Promise.all([
      createUser({ username: "Moe", password: "m_pw" }),
      createUser({ username: "Lucy", password: "l_pw" }),
      createUser({ username: "Ethyl", password: "e_pw" }),
      createUser({ username: "Curly", password: "c_pw" }),
      createUser({ username: "Alexander", password: "a_pw" }),
      createUser({ username: "Eleven", password: "ee_pw" }),
      createUser({ username: "Dustin", password: "d_pw" }),
      createUser({ username: "Mike", password: "mm_pw" }),
    ]);

  console.log(await fetchUsers());

  const [review1, review2, review3, review4,] = await Promise.all([
    createReview({
      businessId: AcmePizza.id,
      userId: moe.id,
      businessrating: 5,
      reviewcomments: "Best NY Style Pizza in Hawkings",
    }),
    createReview({
      businessId: MoesTypewriterRepair.id,
      userId: curly.id,
      businessrating: 4,
      reviewcomments: "Fixed it in a jiff. Highly recommend!",
    }),
    createReview({
      businessId: LucysCandyShop.id,
      userId: moe.id,
      businessrating: 5,
      reviewcomments:
        "I found Shockers there! My favorite. They were banned by the FDA for having red dye#3. These guys can get ANYTHING!",
    }),
    createReview({
      businessId: LucysCandyShop.id,
      userId: curly.id,
      businessrating: 2,
      reviewcomments:
        "I got a cavity. Too much sugar in the candy. I blame Lucy",
    }),
  ]);

  console.log(await getReviews());
  const lucysCandyShopReviews = await getBusinessesReviews(LucysCandyShop.id);
  console.log(lucysCandyShopReviews);

  console.log(await getReviews());
  const moesReviews = await getUsersReviews(moe.id);
  console.log(moesReviews);
  client.end();
};

init();
