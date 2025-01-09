"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
exports.checkJwt = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: 'https://dev-oijzj7i4fib6t6mn.us.auth0.com/api/v2/',
    issuerBaseURL: 'https://dev-oijzj7i4fib6t6mn.us.auth0.com/',
});
