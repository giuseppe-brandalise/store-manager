const { Router } = require('express');
const salesController = require('../controllers/salesController');
const salesMiddleware = require('../middlewares/salesMiddleware');

const salesRouter = Router();

salesRouter.get('/', salesController.getAll);

salesRouter.get('/:id', salesController.getById);

salesRouter.post('/', salesMiddleware.verifyAddSale, salesController.addSale);

salesRouter.delete('/:id', salesController.deleteSale);

salesRouter.put('/:saleId/products/:productId/quantity', salesMiddleware
  .verifyUpdateSale, salesController.updateSale);

module.exports = salesRouter;