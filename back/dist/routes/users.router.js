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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRegister_middleware_1 = __importDefault(require("../middlewares/userRegister.middleware"));
const userLogin_middleware_1 = __importDefault(require("../middlewares/userLogin.middleware"));
const user_controller_1 = require("../controllers/user.controller");
const order_repository_1 = require("../repositories/order.repository");
const auth0_middleware_1 = require("../middlewares/auth0.middleware");
const user_repository_1 = require("../repositories/user.repository");
const usersRouter = (0, express_1.Router)();
usersRouter.post("/register", userRegister_middleware_1.default, user_controller_1.registerUser);
usersRouter.post("/login", userLogin_middleware_1.default, user_controller_1.login);
usersRouter.post("/check-or-create", user_controller_1.checkOrCreateUser);
usersRouter.get("/orders", auth0_middleware_1.checkJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const authSub = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.sub;
    if (!authSub) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = yield user_repository_1.UserRepository.findOne({
        where: { auth0Sub: authSub }
    });
    const orders = yield order_repository_1.OrderRepository.find({
        relations: ["orderProducts", "orderProducts.product"],
        where: { user: { id: user === null || user === void 0 ? void 0 : user.id } },
    });
    res.status(200).json(orders);
}));
exports.default = usersRouter;
