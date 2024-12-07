"use client"

import { Card } from "@/components/Card";
import React, { useEffect, useState } from "react";
import { IProduct } from "@/interfaces/IProduct";
import { getProducts } from "@/helpers/getProducts";

export const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
      getProducts()
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => {
        alert(error.message)
      })
    }, []);
  
    return (
        <>
            <div>
                <h1>Products</h1>
                <div>
                    {products.map(({name, description, price, stock, image, categoryId}, index: number) => (
                        <Card
                        key={index}
                        name={name}
                        description={description}
                        price={price}
                        stock={stock}
                        image={image}
                        categoryId={categoryId}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductsPage;