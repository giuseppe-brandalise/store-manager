const { expect } = require('chai');
const sinon = require('sinon');
const { productsService, productIdMock } = require('../../../src/services/index');

const { productsModel } = require('../../../src/models/index');
const { productsListMock } = require('./mocks/productsMock');

afterEach(function () {
  sinon.restore();
});

describe('Unit tests for the service of products', () => {
  it('should return a list of the products', async () => {
    sinon.stub(productsModel, 'findAll').resolves(productsListMock)
    const result = await productsService.findAll();
    expect(result).to.be.deep.equal(productsListMock);
  });
  it('should return one product when requested an id', async () => {
    sinon.stub(productsModel, 'findById').resolves([productIdMock]);
    const result = await productsService.findById(1);
    expect(result).to.be.deep.equal(productIdMock);
  });
});