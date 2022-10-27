import { Router } from "express";
import { postOrder } from "../controllers/ordersController.js";
import { validOrder } from "../middlewares/ordersMiddleware.js";

const orderRouter = Router();

orderRouter.post('/order', validOrder, postOrder);
// router.get('/orders', middlewares.orders, controllers.orders);
// router.get('/orders/:id', middlewares.orders, controllers.orders);

export default orderRouter;