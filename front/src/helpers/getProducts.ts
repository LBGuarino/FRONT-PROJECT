import { productsArray } from "@/data/utils";
import { IProduct } from "@/interfaces/IProduct";

export const getProducts = async (): Promise<IProduct[]> => {
    return productsArray;
};
