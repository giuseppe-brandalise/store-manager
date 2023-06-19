const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models/index');
const connection = require('../../../src/models/connection');

const { salesMockList, salesMockId, addedSale } = require('./mocks/salesMocks');

describe('Unit tests for the model of sales', function () {
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
  it('should return the information of the new added product', async function () {
    const newSale = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await salesModel.addSale(newSale);
    expect(result).to.be.deep.equal(addedSale);
  });

  it('should return a "done" status when deleting a sale', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves('done');
    await salesModel.deleteSale(id);
    expect(connection.execute).to.have.been.calledWith();
  });
});