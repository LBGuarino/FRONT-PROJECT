export interface CreateOrderDto {
  userId: number | undefined;
  products: { id: number, quantity: number }[];
}
