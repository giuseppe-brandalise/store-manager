const { verifyNameExistence, verifyNameSize } = require('./schemas/productsSchemas');

const verifyProductName = (req, res, next) => {
  const { name } = req.body;

  try {
    verifyNameExistence(name);
    verifyNameSize(name);
    next();
  } catch (e) {
    res.status(e.cause).json({ message: e.message });
  }
};

module.exports = {
  verifyProductName,
};