import { AppDataSource } from "../config/dataSource";
import { OrderProduct } from "../entities/ProductQuantities";

export const OrderProductRepository = AppDataSource.getRepository(OrderProduct);