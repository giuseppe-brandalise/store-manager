const productsModel = require('../models/productsModel');

const getAll = async () => {
  const modelResponse = await productsModel.getAll();
  return modelResponse;
};

const getById = async (id) => {
  const modelResponse = await productsModel.getById(id);
  console.log('service:', modelResponse);
  if (!modelResponse) {
    return 'product not found';
  }
  return modelResponse;
};

module.exports = {
  getAll,
  getById,
};