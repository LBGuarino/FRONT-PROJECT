import { NextFunction, Request, Response, Router } from "express";
import validateOrderCreate from "../middlewares/orderCreate.middleware";
import { createOrder } from "../controllers/order.controller";
import { checkJwt } from "../middlewares/auth0.middleware";

const ordersRouter = Router();

ordersRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
    console.log("Authorization Header:", req.headers.authorization);
    next();
}, checkJwt, (req: Request, res: Response, next: NextFunction) => {
    console.log("Decoded Token Payload:", req.auth);
    next();
}, validateOrderCreate, createOrder);

export default ordersRouter;
