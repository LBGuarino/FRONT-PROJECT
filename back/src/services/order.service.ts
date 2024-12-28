import { CreateOrderDto } from "../dtos/createOrderDto";
import { Order } from "../entities/Order";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../repositories/user.repository";
import { OrderStatus } from "../entities/Order";  
import { OrderProduct } from "../entities/ProductQuantities";
import { OrderProductRepository } from "../repositories/orderproduct.repository";

export const createOrderService = async (
  createOrderDto: CreateOrderDto
): Promise<Order> => {
  const orderProducts: OrderProduct[] = [];

  for await (const {id, quantity} of createOrderDto.products) {
    const product = await ProductRepository.findOneBy({ id });
    if (!product) throw new Error(`Product with id ${id} not found`);
    if (product.stock < quantity)
      throw new Error(`Not enough stock for product ${id}`);

    const orderProduct = OrderProductRepository.create({
      product,
      quantity,
    });
    orderProducts.push(orderProduct);
  }

  const userF = await UserRepository.findOneBy({ id: createOrderDto.userId });
  if (!userF) throw new Error("User not found");

  const newOrder = OrderRepository.create({
    status: OrderStatus.PENDING,
    date: new Date(),
    user: userF,
    orderProducts,
  });

  await OrderRepository.save(newOrder);
  console.log(newOrder)

  for (const orderProduct of orderProducts) {
    orderProduct.order = newOrder;
    await OrderProductRepository.save(orderProduct);
  }
  
  return newOrder;
};
