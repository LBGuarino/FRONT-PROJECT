"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const order_service_1 = require("../services/order.service");
const catchedController_1 = require("../utils/catchedController");
const user_repository_1 = require("../repositories/user.repository");
exports.createOrder = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { products, auth0Sub } = req.body;
    if (!auth0Sub || !products || products.length === 0) {
        return res.status(400).send({ error: "Missing required fields: auth0Sub or products" });
    }
    const user = yield user_repository_1.UserRepository.findOne({
        where: { auth0Sub: auth0Sub },
        select: ['id']
    });
    if (!user) {
        throw new Error('User not found');
    }
    const newOrder = yield (0, order_service_1.createOrderService)({ userId: user.id, products });
    res.send(newOrder);
}));