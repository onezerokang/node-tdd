const express = require("express");
const router = express.Router();

const { hello } = require("../controllers/product");

router.get("/", hello);

module.exports = router;
