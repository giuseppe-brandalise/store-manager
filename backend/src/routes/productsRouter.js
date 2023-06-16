const { Router } = require('express');
const productsController = require('../controllers/productsController');
const productsMiddleware = require('../middlewares/productsMiddleware');

const productsRouter = Router();

productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.getById);

productsRouter.post('/', productsMiddleware.verifyProductName, productsController.addProduct);

productsRouter.put('/:id', productsMiddleware.verifyProductName, productsController.updateProduct);

module.exports = productsRouter;