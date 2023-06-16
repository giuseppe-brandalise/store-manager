const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services/index');
const { productsController } = require('../../../src/controllers/index');

const {
  productsListMock,
  productIdMock,
  productAdded,
  productModded,
} = require('./mocks/productsMocks');

describe('Unit tests for the controller of products', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('should return a list of the products', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(productsListMock);
    await productsController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsListMock);
  });
  it('should return one product when requested an id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById').resolves(productIdMock);
    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productIdMock);
  });
  it('should return the information of the new added product', async function () {
    const res = {};
    const req = {
      body: { name: 'ProdutoX' },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'addProduct').resolves(productAdded);
    await productsController.addProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productAdded);
  });
  it('should return the updated product when send the name and the id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
      body: { name: 'Martelo do Batman' },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'updateProduct').resolves(productModded);
    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productModded);
  });
  it('should return a 204 status when deleting a product', async function () {
    const res = {};
    const req = {
      params: 1,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'deleteProduct').resolves('done');
    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });
});