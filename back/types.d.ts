import { AuthResult } from "express-oauth2-jwt-bearer";

declare namespace Express {
  export interface Request {
    auth?: AuthResult;
  }
}
