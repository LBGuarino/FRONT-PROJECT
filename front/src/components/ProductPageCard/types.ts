import { ICategory } from "@/interfaces/ICategory";

export interface CardProps {  
    id: number,  
    name: string,
    description: string,
    price: number,
    stock: number,
    image: string,
    category: ICategory
}

