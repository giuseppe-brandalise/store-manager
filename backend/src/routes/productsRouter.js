const { Router } = require('express');
const productsController = require('../controllers/productsController');
const productsMiddleware = require('../middlewares/productsMiddleware');

const productsRouter = Router();

productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.getById);

productsRouter.post('/', productsMiddleware.verifyAddProduct, productsController.addProduct);

module.exports = productsRouter;