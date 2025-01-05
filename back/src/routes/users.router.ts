import { Request, Response, Router } from "express";
import validateUserRegister from "../middlewares/userRegister.middleware";
import validateUserLogin from "../middlewares/userLogin.middleware";
import { login, registerUser, checkOrCreateUser } from "../controllers/user.controller";
import { OrderRepository } from "../repositories/order.repository";
import { checkJwt } from "../middlewares/auth0.middleware";
import { UserRepository } from "../repositories/user.repository";

const usersRouter = Router();

usersRouter.post("/register", validateUserRegister, registerUser);

usersRouter.post("/login", validateUserLogin, login);

usersRouter.post("/check-or-create", checkOrCreateUser);

usersRouter.get("/orders", checkJwt, async (req: Request, res: Response) => {
  const authSub = req.auth?.payload?.sub;
  if (!authSub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await UserRepository.findOne({ 
    where : { auth0Sub : authSub}
})  

  const orders = await OrderRepository.find({
    relations: ["orderProducts", "orderProducts.product"],
    where: { user: { id: user?.id } },
  });
  
  res.status(200).json(orders);
})


export default usersRouter;
