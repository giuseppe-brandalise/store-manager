const connection = require('./connection');

const getAll = async () => {
  const [connectionResponse] = await connection
    .execute(
      `SELECT sp.sale_id AS saleId, sp.product_id AS productId, sp.quantity, s.date
      FROM sales_products AS sp
      INNER JOIN sales AS s ON s.id = sp.sale_id
      ORDER BY s.id, sp.product_id ASC;`,
    );
  return connectionResponse;
};

const getById = async (id) => {
  const [connectionResponse] = await connection
    .execute(
      `SELECT sp.product_id AS productId, sp.quantity, s.date
      FROM sales_products AS sp
      INNER JOIN sales AS s ON s.id = sp.sale_id
      WHERE sp.sale_id = ?
      ORDER BY sp.product_id ASC;`,
      [id],
    );
  return connectionResponse;
};

module.exports = {
  getAll,
  getById,
};