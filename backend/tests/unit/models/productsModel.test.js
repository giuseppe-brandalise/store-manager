const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models/index');

const { productsListMock, productIdMock } = require('./mocks/productsMock');
const connection = require('../../../src/models/connection');

afterEach(function () {
  sinon.restore();
});

describe('Unit tests for the model of products', () => {
  it('should return a list of the products', async () => {
    sinon.stub(connection, 'execute').resolves([productsListMock])
    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(productsListMock);
  });
  it('should return one product when requested an id', async () => {
    sinon.stub(connection, 'execute').resolves([productIdMock]);
    const result = await productsModel.findById(1);
    expect(result).to.be.deep.equal(productIdMock);
  });
});