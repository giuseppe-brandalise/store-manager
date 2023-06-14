const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../src/services/index');
const { salesModel } = require('../../../src/models/index');

const { salesMockList, salesMockId } = require('./mocks/salesMocks');

describe('Unit tests for the service of sales', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('should return a list of the sales', async function () {
      sinon.stub(salesModel, 'getAll').resolves(salesMockList);
      const result = await salesService.getAll();
      expect(result).to.be.deep.equal(salesMockList);
    });
    it('should return one product when requested an id', async function () {
      sinon.stub(salesModel, 'getById').resolves(salesMockId);
      const result = await salesService.getById(1);
      expect(result).to.be.deep.equal(salesMockId);
    });
  });