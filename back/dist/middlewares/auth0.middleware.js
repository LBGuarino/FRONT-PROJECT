"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
exports.checkJwt = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
    issuerBaseURL: `${process.env.AUTH0_ISSUER_BASE_URL}`,
});
