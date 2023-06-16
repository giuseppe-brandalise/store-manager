const verifyProductIdExistence = (sale) => {
  if (!sale.productId) {
    throw new Error('"productId" is required', { cause: 400 });
  }
};

const verifyQuantityExistence = (sale) => {
  if (!sale.quantity) {
    throw new Error('"quantity" is required', { cause: 400 });
  }
};

const verifyQuantitySize = (sale) => {
  if (sale.quantity < 1) {
    throw new Error('"quantity" must be greater than or equal to 1', { cause: 422 });
  }
};

module.exports = {
  verifyProductIdExistence,
  verifyQuantitySize,
  verifyQuantityExistence,
};