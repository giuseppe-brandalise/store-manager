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

const updateSale = async (saleId, productId, quantity) => {
  const verifySale = await salesModel.getById(saleId);
  if (!verifySale[0]) return 'sale not found';
  const verifyProduct = verifySale.filter((product) => product.productId === Number(productId));
  if (!verifyProduct[0]) return 'product not found';
  const modelResponse = await salesModel.updateSale(saleId, productId, quantity);
  return modelResponse;
};

module.exports = {
  getAll,
  getById,
  addSale,
  deleteSale,
  updateSale,
};