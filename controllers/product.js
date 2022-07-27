const productModel = require("../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).send();
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
