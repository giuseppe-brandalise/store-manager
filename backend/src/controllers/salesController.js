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

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const serviceResponce = await salesService.getById(id);
  if (serviceResponce === 'sale not found') {
    return res.status(404).json({ message: 'Sale not found' });
  }
  await salesService.deleteSale(id);
  return res.status(204).json();
};

const updateSale = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const serviceResponce = await salesService.updateSale(saleId, productId, quantity);
  switch (serviceResponce) {
    case 'sale not found':
      return res.status(404).json({ message: 'Sale not found' });
    case 'product not found':
      return res.status(404).json({ message: 'Product not found in sale' });
    default:
      return res.status(200).json(serviceResponce);
  }
};

module.exports = { 
  getAll,
  getById,
  addSale,
  deleteSale,
  updateSale,
};