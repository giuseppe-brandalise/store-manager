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

const addSale = async (sales) => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (NOW())');
  console.log(insertId);
  await Promise.all(sales.map(async (sale) => {
    await connection.execute(
      `INSERT INTO sales_products
      (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
      [insertId, sale.productId, sale.quantity],
    );
  }));
  return {
    id: insertId,
    itemsSold: sales,
  };
};

module.exports = {
  getAll,
  getById,
  addSale,
};