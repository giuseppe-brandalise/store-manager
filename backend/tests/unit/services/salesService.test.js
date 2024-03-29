const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../src/services/index');
const { salesModel, productsModel } = require('../../../src/models/index');

const { salesMockList, salesMockId, addedSale } = require('./mocks/salesMocks');

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
    sinon.stub(salesModel, 'addSale').resolves(addedSale);
    sinon.stub(productsModel, 'getById').resolves([{
      id: 1,
      name: 'Martelo de Thor',
    }]);
    const result = await salesService.addSale(newSale);
    expect(result).to.be.deep.equal(addedSale);
  });
  it('should return a "done" status when deleting a sale', async function () {
    const id = 1;
    sinon.stub(salesModel, 'deleteSale').resolves('done');
    sinon.stub(salesModel, 'getById').resolves(salesMockId);
    const result = await salesService.deleteSale(id);
    expect(result).to.be.deep.equal('done');
  });
});