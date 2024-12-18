import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
    audience: "https://dev-4uohkqf0fwyqpje6.us.auth0.com/api/v2/",
    issuerBaseURL: `https://dev-4uohkqf0fwyqpje6.us.auth0.com/`,
});