export interface CreateOrderDto {
  userid: number | undefined;
  products: { id: number, quantity: number }[];
}
