import { Request, Response, Router } from "express";
import validateUserRegister from "../middlewares/userRegister.middleware";
import validateUserLogin from "../middlewares/userLogin.middleware";
import { login, registerUser } from "../controllers/user.controller";
import checkLogin from "../middlewares/checkLogin.middleware";
import { OrderRepository } from "../repositories/order.repository";
import { checkJwt } from "../middlewares/auth0.middleware";
import { UserRepository } from "../repositories/user.repository";
import { DeepPartial } from "typeorm";
import { User } from "../entities/User";

const usersRouter = Router();

usersRouter.post("/register", validateUserRegister, registerUser);

usersRouter.post("/login", validateUserLogin, login);

usersRouter.get("/orders", checkJwt, async (req: Request, res: Response) => {
  const authSub = req.auth?.payload?.sub;
  if (!authSub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await UserRepository.findOne({ 
    where : { auth0Sub : authSub}
})  

  const orders = await OrderRepository.find({
    relations: ["products"],
    where: { user: { id: user?.id } },
  });

  res.status(200).json(orders);
})


export default usersRouter;
