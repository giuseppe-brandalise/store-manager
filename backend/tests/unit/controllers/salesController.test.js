const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');
const salesMiddleware = require('../../../src/middlewares/salesMiddleware');

const { salesMockList, salesMockId, addedSale } = require('./mocks/salesMocks');

describe('Unit tests for the controller of sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('should return a list of the sales', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAll').resolves(salesMockList);
    await salesController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMockList);
  });
  it('should return a list of an specific sale when requested an sale id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getById').resolves(salesMockId);
    await salesController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMockId);
  });
  it('should return the information of the new added sale', async function () {
    const res = {};
    const req = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'addSale').resolves(addedSale);
    await salesController.addSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(addedSale);
  });
  it('should not allow the adding process when there in no productId', async function () {
    const res = {};
    const req = {
      body: [
        {
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesMiddleware.verifyAddSale(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });
  it('should not allow the adding process when there in no quantity', async function () {
    const res = {};
    const req = {
      body: [
        {
          productId: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesMiddleware.verifyAddSale(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
  it('should not allow the adding process when quantity is zero or bellow', async function () {
    const res = {};
    const req = {
      body: [
        {
          productId: 1,
          quantity: 0,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesMiddleware.verifyAddSale(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been
      .calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  it('should return a 204 status when deleting a sale', async function () {
    const res = {};
    const req = {
      params: 1,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'deleteSale').resolves('done');
    sinon.stub(salesService, 'getById').resolves('done');
    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });
  it('should return sale not found when deleting an inexisting sale', async function () {
    const res = {};
    const req = {
      params: 8,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'deleteSale').resolves('done');
    sinon.stub(salesService, 'getById').resolves('sale not found');
    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
  it('should return sale not found when updating an inexisting sale', async function () {
    const res = {};
    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: {
        quantity: 1,
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'updateSale').resolves('sale not found');
    await salesController.updateSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
  it('should return product not found when updating an inexisting product', async function () {
    const res = {};
    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: {
        quantity: 1,
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'updateSale').resolves('product not found');
    await salesController.updateSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found in sale' });
  });
  it('should not allow the updating process when there in no quantity', async function () {
    const res = {};
    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: {
        noQuantity: true,
      },
    };
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesMiddleware.verifyUpdateSale(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
  it('should not allow the updating process when quantity is zero or bellow', async function () {
    const res = {};
    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: {
        quantity: 0,
      },
    };
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesMiddleware.verifyUpdateSale(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been
      .calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
});
