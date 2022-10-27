import { Router } from "express";
import { postClient, getClientOrder} from "../controllers/clientsController.js";
import { validClient } from "../middlewares/clientsMiddleware.js";

const clientRouter = Router();

clientRouter.post('/clients', validClient, postClient);
clientRouter.get('/clients/:id/orders', getClientOrder);

export default clientRouter;