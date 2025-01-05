import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  loginUserService,
  registerUserService,
  checkOrCreateUserService
} from "../services/user.service";

export const registerUser = catchedController(
  async (req: Request, res: Response) => {
    const { password, address, phone, auth0Sub } = req.body;
    const newUser = await registerUserService({
      auth0Sub,
      password,
      address,
      phone,
    });
    res.status(201).send(newUser);
  }
);

export const checkOrCreateUser = catchedController(async (req: Request, res: Response) => {
  const { auth0Sub, email, name } = req.body;
  try {
    const user = await checkOrCreateUserService(auth0Sub, email, name);
    res.status(200).json({
      isRegistered: user.isRegistered,
      user
    });
  } catch (error) {
    console.error("Error checking or creating user:", error);
    res.status(400).send(error);
  }
});

export const login = catchedController(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUserService({ email, password });
  res.status(200).send({
    login: true,
    user: user.user,
    token: user.token,
  });
});
