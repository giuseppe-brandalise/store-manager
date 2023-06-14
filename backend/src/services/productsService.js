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

module.exports = {
  getAll,
  getById,
};