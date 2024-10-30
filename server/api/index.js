const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));

router.use("/users", require("./users"));

router.use("/businesses", require("./business"));

router.use("/reviews", require("./review"));

module.exports = router;
