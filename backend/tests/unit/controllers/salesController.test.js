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
  it('should not return the information of the new added sale when there in no productId', async function () {
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
  it('should not return the information of the new added sale when there in no quantity', async function () {
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
  it('should not return the information of the new added sale when quantity is zero or bellow', async function () {
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
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
});
