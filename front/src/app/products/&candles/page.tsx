"use client"
import React, { useEffect, useState } from "react";
import { IProduct } from "@/interfaces/IProduct";
import { getProducts } from "@/helpers/getProducts";
import { ProductCard } from "@/components/ProductPageCard";
import styles from './index.module.css';
import BasicBreadcrumbs from "@/components/Breadcrumbs";

export default function ProductsPage() {
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

            <div className={styles.breadcrumbs}>            
              <BasicBreadcrumbs />
            </div>
            <div className={styles.cardsContainer}>
              {products.map(({name, description, price, stock, image, category}, index: number) => (
                        <ProductCard
                        key={index}
                        name={name}
                        description={description}
                        price={price}
                        stock={stock}
                        image={image}
                        category={category}
                        />
                    ))}
            </div>
        </>
    )
}

