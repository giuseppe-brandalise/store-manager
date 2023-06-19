const { salesModel, productsModel } = require('../models/index');

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

const addSale = async (sales) => {
  const verifyProducts = await Promise.all(sales
    .map(({ productId }) => productsModel.getById(productId)));
  if (verifyProducts.includes(undefined)) return 'product not found';
  const modelResponse = await salesModel.addSale(sales);
  return modelResponse;
};

const deleteSale = async (id) => {
  const verifySale = await salesModel.getById(id);
  if (!verifySale) return 'sale not found';
  await salesModel.deleteSale(id);
  return 'done';
};

module.exports = {
  getAll,
  getById,
  addSale,
  deleteSale,
};