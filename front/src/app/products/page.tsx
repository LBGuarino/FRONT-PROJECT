import { Card } from "@/components/Card";
import React from "react";
import { products } from "./utils";

export const ProductsPage: React.FC = () => {
    return (
        <>
            <div>
                <h1>Products</h1>
                <div>
                    {products.map((product, index) => (
                        <Card
                        key={index}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        stock={product.stock}
                        image={product.image}
                        categoryId={product.categoryId}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}