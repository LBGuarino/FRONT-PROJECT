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
exports.createOrderService = void 0;
const order_repository_1 = require("../repositories/order.repository");
const product_repository_1 = require("../repositories/product.repository");
const user_repository_1 = require("../repositories/user.repository");
const Order_1 = require("../entities/Order");
const orderproduct_repository_1 = require("../repositories/orderproduct.repository");
const createOrderService = (createOrderDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, products } = createOrderDto;
    if (!userId || !products || products.length === 0)
        throw new Error("Missing required fields: userId or products");
    const user = yield user_repository_1.UserRepository.findOneBy({ id: userId });
    if (!user)
        throw new Error("User not found");
    const newOrder = order_repository_1.OrderRepository.create({
        status: Order_1.OrderStatus.PENDING,
        date: new Date(),
        user,
    });
    yield order_repository_1.OrderRepository.save(newOrder);
    const orderProducts = [];
    for (const { id, quantity } of products) {
        if (!id || !quantity || quantity <= 0)
            throw new Error(`Invalid product id: ${id} or quantity: ${quantity}`);
        const product = yield product_repository_1.ProductRepository.findOne({
            where: { id: Number(id) },
        });
        if (!product)
            throw new Error(`Product with id ${id} not found`);
        if (product.stock < quantity)
            throw new Error(`Not enough stock for product ${id}`);
        const orderProduct = orderproduct_repository_1.OrderProductRepository.create({
            product,
            quantity,
            order: newOrder,
        });
        orderProducts.push(orderProduct);
        product.stock -= quantity;
        yield product_repository_1.ProductRepository.save(product);
    }
    yield orderproduct_repository_1.OrderProductRepository.save(orderProducts);
    return newOrder;
});
exports.createOrderService = createOrderService;
