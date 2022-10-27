import { Router } from "express";
import { postCake } from "../controllers/cakesController.js";
import { validCake } from "../middlewares/cakesMiddleware.js";

const cakeRouter = Router();

cakeRouter.post("/cakes", validCake, postCake);

export default cakeRouter;