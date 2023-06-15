const { productsService } = require('../services/index');

const getAll = async (_req, res) => {
  const serviceResponce = await productsService.getAll();
  res.status(200).json(serviceResponce);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const serviceResponce = await productsService.getById(id);
  if (serviceResponce === 'product not found') {
    return res.status(404).json({ message: 'Product not found' });
  } 
  res.status(200).json(serviceResponce);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const serviceResponce = await productsService.addProduct(name);
  return res.status(201).json(serviceResponce);
};

module.exports = { 
  getAll,
  getById,
  addProduct,
};