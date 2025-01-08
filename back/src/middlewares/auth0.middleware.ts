import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
    audience: 'https://dev-oijzj7i4fib6t6mn.us.auth0.com/api/v2/',
    issuerBaseURL: 'https://dev-oijzj7i4fib6t6mn.us.auth0.com/',
});

