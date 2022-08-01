const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router.post("/", createProduct);

router.get("/", getProducts);

router.get("/:productId", getProductById);

router.put("/:productId", updateProduct);

router.delete("/:productId", deleteProduct);

module.exports = router;
