import { Request, Response } from "express";
import { createOrderService } from "../services/order.service";
import { catchedController } from "../utils/catchedController";
import { UserRepository } from "../repositories/user.repository";

interface OrderRequest {
  products: { id: number, quantity: number }[];
  auth0Sub: string;
}

export const createOrder = catchedController(
  async (req: Request<{}, {}, OrderRequest>, res: Response) => {
    const { products, auth0Sub } = req.body;
    console.log(req.body)
    console.log(auth0Sub);

    if (!auth0Sub || !products || products.length === 0) {
      return res.status(400).send({ error: "Missing required fields: auth0Sub or products" });
    }

    const user = await UserRepository.findOne({   
      where: { auth0Sub: auth0Sub },
      select: ['id']
    })

if (!user) {
  throw new Error('User not found')
}

    const newOrder = await createOrderService({ userid: user.id, products });
    res.send(newOrder);
  }
);
