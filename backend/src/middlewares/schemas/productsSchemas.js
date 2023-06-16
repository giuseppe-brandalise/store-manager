const verifyNameExistence = (name) => {
  if (!name) {
    throw new Error('"name" is required', { cause: 400 });
  }
};

const verifyNameSize = (name) => {
  if (name.length < 5) {
    throw new Error('"name" length must be at least 5 characters long', { cause: 422 });
  }
};

module.exports = {
  verifyNameExistence,
  verifyNameSize,
};