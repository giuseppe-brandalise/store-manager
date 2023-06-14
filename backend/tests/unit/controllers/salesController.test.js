const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');

const { salesMockList, salesMockId } = require('./mocks/salesMocks');

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
});
