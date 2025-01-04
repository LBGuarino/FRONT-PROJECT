import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { getProductByIdService, getProductsService, searchProductsService } from "../services/products.service";

export const getProducts = catchedController(
  async (req: Request, res: Response) => {
    const products = await getProductsService();
    res.json(products);
  }
);

export const searchProducts = catchedController(
  async (req: Request, res: Response) => {
    const { search } = req.query;
    const products = await searchProductsService(search as string);
    res.json(products);
  }
);

export const getProductById = catchedController(
  async (req: Request, res: Response) => {
    const product = await getProductByIdService(req);
    res.json(product);
  }
);
