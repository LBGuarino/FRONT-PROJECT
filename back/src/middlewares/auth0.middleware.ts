import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
    audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
    issuerBaseURL: `${process.env.AUTH0_ISSUER_BASE_URL}`,
});

console.log(process.env.AUTH0_ISSUER_BASE_URL)