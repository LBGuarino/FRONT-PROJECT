import { ProductId } from "@/components/hooks";
import { IProduct } from "./IProduct";
import { IOrderProducts } from "./IOrderProducts";

export interface IOrder {
    id: number;
    status: string;
    date: Date;
    orderProducts: IOrderProducts[];
}