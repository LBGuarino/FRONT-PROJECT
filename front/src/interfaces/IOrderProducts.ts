import { IProduct } from "./IProduct";

export interface IOrderProducts {
    id: number;
    orderId: number;
    product: IProduct;
    quantity: number;
}