import { IOrderProducts } from "./IOrderProducts";

export interface IOrder {
    id: number;
    status: string;
    date: Date;
    orderProducts: IOrderProducts[];
}