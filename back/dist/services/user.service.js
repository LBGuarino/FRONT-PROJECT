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
exports.loginUserService = exports.registerUserService = exports.checkUserExists = exports.checkOrCreateUserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
const credential_service_1 = require("./credential.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("../config/envs");
const checkOrCreateUserService = (auth0Sub, email, name) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_repository_1.UserRepository.findOneBy({ auth0Sub });
    if (!user) {
        user = yield user_repository_1.UserRepository.create({ auth0Sub, email, name, isRegistered: false });
        yield user_repository_1.UserRepository.save(user);
    }
    return user;
});
exports.checkOrCreateUserService = checkOrCreateUserService;
const checkUserExists = (auth0Sub) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.UserRepository.findOneBy({ auth0Sub });
    return !!user;
});
exports.checkUserExists = checkUserExists;
const registerUserService = (registerUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { auth0Sub, address, phone } = registerUserDto;
    let user = yield user_repository_1.UserRepository.findOne({
        where: { auth0Sub },
        relations: ["credential"],
    });
    if (!user) {
        throw new Error("User not found for registration.");
    }
    user.address = address;
    user.phone = phone;
    if (!user.credential) {
        const credential = yield (0, credential_service_1.createCredentialService)({ password: auth0Sub });
        user.credential = credential;
        user.isRegistered = true;
    }
    yield user_repository_1.UserRepository.save(user);
    return user;
});
exports.registerUserService = registerUserService;
const loginUserService = (loginUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.UserRepository.findOne({
        where: {
            email: loginUserDto.email,
        },
        relations: ["credential", "orders"],
    });
    if (!user)
        throw new Error("User not found");
    if (yield (0, credential_service_1.checkPasswordService)(loginUserDto.password, user.credential.password)) {
        const token = jsonwebtoken_1.default.sign({ userid: user.id }, envs_1.JWT_SECRET);
        return {
            user,
            token,
        };
    }
    else {
        throw new errors_1.ClientError("Invalid password");
    }
});
exports.loginUserService = loginUserService;
