const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/product");

router.post("/", createProduct);

router.get("/", getProducts);

router.get("/:productId", getProductById);

module.exports = router;
