const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services/index');
const { productsController } = require('../../../src/controllers/index');
const productsMiddleware = require('../../../src/middlewares/productsMiddleware');

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
  it('should return product not found when given an inexistent id', async function () {
    const res = {};
    const req = {
      params: { id: 8 },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById').resolves('product not found');
    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(({ message: 'Product not found' }));
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
  it('should not allow the adding process when there is no name', async function () {
    const res = {};
    const req = {
      body: {
        noName: true,
      },
    };
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsMiddleware.verifyProductName(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been
      .calledWith({ message: '"name" is required' });
  });
  it(`should not allow the adding process when the name
    is smaller then 5 letters`, async function () {
    const res = {};
    const req = {
      body: {
        name: 'name',
      },
    };
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsMiddleware.verifyProductName(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been
      .calledWith({ message: '"name" length must be at least 5 characters long' });
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
  it('should return product not found when given an inexistent product', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
      body: { name: 'Martelo do Batman' },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'updateProduct').resolves('product not found');
    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
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
  it('should return product not found when deleting a inexisting product', async function () {
    const res = {};
    const req = {
      params: 1,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'deleteProduct').resolves('product not found');
    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});