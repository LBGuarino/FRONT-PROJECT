import { Request, Response } from "express";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

export const checkProductExists = async (itemId: number): Promise<boolean> => {
  const item: Product | null = await ProductRepository.findOneBy({
    id: itemId,
  });
  return !!item;
};

export const getProductsService = async (): Promise<Product[]> => {
  return await ProductRepository.find();
};

export const getProductByIdService = async (req: Request) => {
  const { id } = req.params;
  const product = await ProductRepository.findOne({ 
      where: { id: Number(id) },
      relations: ['category'],
  });
    return product;
  };

