import { ICategory } from "@/interfaces/ICategory";

export interface CardProps {    
    name: string,
    description: string,
    price: number,
    stock: number,
    image: string,
    category: ICategory
}

