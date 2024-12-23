import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  loginUserService,
  registerUserService,
} from "../services/user.service";

export const registerUser = catchedController(
  async (req: Request, res: Response) => {
    const { email, password, name, address, phone, auth0Sub } = req.body;
    const newUser = await registerUserService({
      email,
      password,
      name,
      address,
      phone,
      auth0Sub,
    });
    res.status(201).send(newUser);
  }
);

export const login = catchedController(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUserService({ email, password });
  res.status(200).send({
    login: true,
    user: user.user,
    token: user.token,
  });
});
