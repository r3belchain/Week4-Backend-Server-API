const { status } = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);

  res.status(status.CREATED).send({
    status: status.CREATED,
    message: 'Create Product Success',
    data: product,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await productService.getAllProducts();

  res.status(status.OK).send({
    status: status.OK,
    message: 'Get All Products Success',
    data: products,
  });
});

const getProduct = catchAsync(async (req, res) => {
  const category = await productService.getProductById(req.params.productId);
  if (!category) {
    throw new ApiError(status.NOT_FOUND, 'Product not found');
  }

  res.status(status.OK).send({
    status: status.OK,
    message: 'Get Category Success',
    data: category,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);

  res.status(status.OK).send({
    status: status.OK,
    message: 'Update Product Success',
    data: product,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.id);

  res.status(status.OK).send({
    status: status.OK,
    message: 'Delete User Success',
    data: null,
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
