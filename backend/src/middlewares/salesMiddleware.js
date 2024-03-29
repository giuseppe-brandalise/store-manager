const {
  verifyProductIdExistence,
  verifyQuantityExistence,
  verifyQuantitySize,
  } = require('./schemas/salesSchemas');

const verifyAddSale = (req, res, next) => {
  const sales = req.body;

  try {
    sales.forEach((sale) => {
      verifyProductIdExistence(sale);
      verifyQuantitySize(sale);
      verifyQuantityExistence(sale);
    });
    next();
  } catch (e) {
    res.status(e.cause).json({ message: e.message });
  }
};

const verifyUpdateSale = (req, res, next) => {
  const quantity = req.body;
  try {
    verifyQuantitySize(quantity);
    verifyQuantityExistence(quantity);
    next();
  } catch (e) {
    res.status(e.cause).json({ message: e.message });
  }
};

module.exports = {
  verifyAddSale,
  verifyUpdateSale,
};