const { salesModel } = require('../models/index');

const getAll = async () => {
  const modelResponse = await salesModel.getAll();
  return modelResponse;
};

const getById = async (id) => {
  const modelResponse = await salesModel.getById(id);
  if (!modelResponse[0]) {
    return 'sale not found';
  }
  return modelResponse;
};

module.exports = {
  getAll,
  getById,
};