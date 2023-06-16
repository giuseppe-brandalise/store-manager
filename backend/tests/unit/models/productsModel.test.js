const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models/index');
const connection = require('../../../src/models/connection');

const {
  productsListMock,
  productIdMock,
  productAdded,
  productModded,
} = require('./mocks/productsMocks');

describe('Unit tests for the model of products', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('should return a list of the products', async function () {
    sinon.stub(connection, 'execute').resolves([productsListMock]);
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(productsListMock);
  });
  it('should return one product when requested an id', async function () {
    sinon.stub(connection, 'execute').resolves([[productIdMock]]);
    const result = await productsModel.getById(1);
    expect(result).to.be.deep.equal(productIdMock);
  });
  it('should return the information of the new added product', async function () {
    sinon.stub(connection, 'execute').resolves([[productAdded]]);
    const result = await productsModel.addProduct('ProdutoX');
    expect(result).to.be.deep.equal(productAdded);
  });
  it('should return the updated product when send the name and the id', async function () {
    const id = 1;
    const name = 'Martelo do Batman';
    sinon.stub(connection, 'execute').resolves([[productModded]]);
    const result = await productsModel.updateProduct(id, name);
    expect(result).to.be.deep.equal(productModded);
  });
});