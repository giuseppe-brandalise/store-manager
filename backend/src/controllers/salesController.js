const { salesService } = require('../services/index');

const getAll = async (_req, res) => {
  const serviceResponce = await salesService.getAll();
  res.status(200).json(serviceResponce);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const serviceResponce = await salesService.getById(id);
  if (serviceResponce === 'sale not found') {
    return res.status(404).json({ message: 'Sale not found' });
  } 
  res.status(200).json(serviceResponce);
};

const addSale = async (req, res) => {
  const sales = req.body;
  const serviceResponce = await salesService.addSale(sales);
  if (serviceResponce === 'product not found') {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(201).json(serviceResponce);
};

module.exports = { 
  getAll,
  getById,
  addSale,
};