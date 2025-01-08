import { Router } from "express";
import validateOrderCreate from "../middlewares/orderCreate.middleware";
import { createOrder } from "../controllers/order.controller";
import { checkJwt } from "../middlewares/auth0.middleware";

const ordersRouter = Router();

ordersRouter.post("/", checkJwt, validateOrderCreate, createOrder);

export default ordersRouter;
