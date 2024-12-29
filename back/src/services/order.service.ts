import { CreateOrderDto } from "../dtos/createOrderDto";
import { Order } from "../entities/Order";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../repositories/user.repository";
import { OrderStatus } from "../entities/Order";  
import { OrderProduct } from "../entities/OrderProduct";
import { OrderProductRepository } from "../repositories/orderproduct.repository";

export const createOrderService = async (
  createOrderDto: CreateOrderDto
): Promise<Order> => {
  const { userId, products } = createOrderDto;
  if (!userId || !products || products.length === 0)
    throw new Error("Missing required fields: userId or products");

  const user = await UserRepository.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  const newOrder = OrderRepository.create({
    status: OrderStatus.PENDING,
    date: new Date(),
    user,
  });
  await OrderRepository.save(newOrder);

  const orderProducts: OrderProduct[] = [];

  for (const { id, quantity } of products) {
    if (!id || !quantity || quantity <= 0)
      throw new Error(`Invalid product id: ${id} or quantity: ${quantity}`);

    const product = await ProductRepository.findOne({
      where: { id: Number(id) },
    });

    if (!product) throw new Error(`Product with id ${id} not found`);
    if (product.stock < quantity)
      throw new Error(`Not enough stock for product ${id}`);

    const orderProduct = OrderProductRepository.create({
      product,
      quantity,
      order: newOrder, 
    });
    orderProducts.push(orderProduct);

    product.stock -= quantity;
    await ProductRepository.save(product);
  }

  await OrderProductRepository.save(orderProducts);

  return newOrder;
};


