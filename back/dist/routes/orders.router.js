"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderCreate_middleware_1 = __importDefault(require("../middlewares/orderCreate.middleware"));
const order_controller_1 = require("../controllers/order.controller");
const auth0_middleware_1 = require("../middlewares/auth0.middleware");
const ordersRouter = (0, express_1.Router)();
ordersRouter.post("/", auth0_middleware_1.checkJwt, orderCreate_middleware_1.default, order_controller_1.createOrder);
exports.default = ordersRouter;
