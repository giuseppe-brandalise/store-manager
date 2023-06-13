const connection = require('./connection');

const getAll = async () => {
  const [connectionResponse] = await connection.execute('SELECT * FROM products');
  return connectionResponse;
};

const getById = async (id) => {
  const [connectionResponse] = await connection
    .execute('SELECT * FROM products WHERE id = ?', [id]);
  return connectionResponse[0];
};

module.exports = {
  getAll,
  getById,
};