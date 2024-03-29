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

const addProduct = async (name) => {
  await connection.execute('INSERT INTO products (name) VALUE (?)', [name]);
  const [connectionResponse] = await connection
    .execute('SELECT * FROM products WHERE name = ?', [name]);
  return connectionResponse[0];
};

const updateProduct = async (id, name) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return getById(id);
};

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM products  WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};