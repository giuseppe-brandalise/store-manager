const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services/index');
const { productsController } = require('../../../src/controllers/index');

const { productsListMock, productIdMock } = require('./mocks/productsMock');

afterEach(function () {
  sinon.restore();
});

describe('Unit tests for the service of products', () => {
  it('should return a list of the products', async () => {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const result = await productsController.findAll(req, res);
    sinon.stub(productsService, 'findAll').resolves(productsListMock)
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsListMock);
  });
  it('should return one product when requested an id', async () => {
    const res = {};
    const req = {
      params: { id: 1 },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findById').resolves(productIdMock);
    const result = await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productIdMock);
  });
});