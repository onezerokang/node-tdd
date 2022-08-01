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

exports.updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).send();
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(productId);

    console.log("삭제된 상품:", deletedProduct);

    if (!deletedProduct) {
      return res.status(404).send();
    }

    res.status(200).json(deletedProduct);
  } catch (err) {
    next(err);
  }
};
