import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";

const validateUserRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, address, phone, auth0Sub } = req.body;
  if (!password || !address || !phone || !auth0Sub )
    next(new ClientError("Missing fields"));
  else next();
};

export default [validateUserRegister];
