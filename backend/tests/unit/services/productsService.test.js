const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services/index');

const { productsModel } = require('../../../src/models/index');
const { productsListMock, productIdMock } = require('./mocks/productsMocks');

describe('Unit tests for the service of products', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('should return a list of the products', async function () {
    sinon.stub(productsModel, 'getAll').resolves(productsListMock);
    const result = await productsService.getAll();
    expect(result).to.be.deep.equal(productsListMock);
  });
  it('should return one product when requested an id', async function () {
    sinon.stub(productsModel, 'getById').resolves(productIdMock);
    const result = await productsService.getById(1);
    expect(result).to.be.deep.equal(productIdMock);
  });
});