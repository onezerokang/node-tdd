const express = require("express");
const router = express.Router();

const { createProduct, getProducts } = require("../controllers/product");

router.post("/", createProduct);

router.get("/", getProducts);

module.exports = router;
