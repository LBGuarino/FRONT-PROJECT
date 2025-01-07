"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../utils/errors");
const validateUserRegister = (req, res, next) => {
    const { password, address, phone, auth0Sub } = req.body;
    if (!password || !address || !phone || !auth0Sub)
        next(new errors_1.ClientError("Missing fields"));
    else
        next();
};
exports.default = [validateUserRegister];
