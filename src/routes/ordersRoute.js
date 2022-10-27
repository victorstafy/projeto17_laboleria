import { Router } from "express";
import { postOrder, getOrders, getOrderById } from "../controllers/ordersController.js";
import { validOrder } from "../middlewares/ordersMiddleware.js";

const orderRouter = Router();

orderRouter.post('/order', validOrder, postOrder);
orderRouter.get('/orders', getOrders);
orderRouter.get('/orders/:id', getOrderById);

export default orderRouter;