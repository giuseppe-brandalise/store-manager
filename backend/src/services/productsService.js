const { productsModel } = require('../models/index');

const getAll = async () => {
  const modelResponse = await productsModel.getAll();
  return modelResponse;
};

const getById = async (id) => {
  const modelResponse = await productsModel.getById(id);
  if (!modelResponse) {
    return 'product not found';
  }
  return modelResponse;
};

const addProduct = async (name) => {
  const modelResponse = await productsModel.addProduct(name);
  return modelResponse;
};

const updateProduct = async (id, name) => {
  const verifyProduct = await productsModel.getById(id);
  if (!verifyProduct) return 'product not found';
  const modelResponse = await productsModel.updateProduct(id, name);
  return modelResponse;
};

const deleteProduct = async (id, name) => {
  const verifyProduct = await productsModel.getById(id);
  if (!verifyProduct) return 'product not found';
  await productsModel.deleteProduct(id, name);
  return 'done';
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};