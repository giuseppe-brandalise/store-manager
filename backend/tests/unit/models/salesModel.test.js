const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models/index');
const connection = require('../../../src/models/connection');

const { salesMockList, salesMockId } = require('./mocks/salesMocks');

describe('Unit tests for the model of products', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('should return a list of the products', async function () {
    sinon.stub(connection, 'execute').resolves([salesMockList]);
    const result = await salesModel.getAll();
    expect(result).to.be.deep.equal(salesMockList);
  });
  it('should return one product when requested an id', async function () {
    sinon.stub(connection, 'execute').resolves([salesMockId]);
    const result = await salesModel.getById(1);
    expect(result).to.be.deep.equal(salesMockId);
  });
});