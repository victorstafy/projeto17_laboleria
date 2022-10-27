import express from 'express';
import * as controllers from '../controllers/ordersController.js';
import * as middlewares from '../middlewares/ordersMiddleware.js';

const router = express.Router();

router.post('/order', middlewares.orders, controllers.orders);
router.get('/orders', middlewares.orders, controllers.orders);
router.get('/orders/:id', middlewares.orders, controllers.orders);

export default router;