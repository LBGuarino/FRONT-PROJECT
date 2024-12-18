"use client"
import React, { useEffect, useState } from "react";
import { IProduct } from "@/interfaces/IProduct";
import { getProducts } from "@/helpers/getProducts";
import { ProductCard } from "@/components/ProductPageCard";
import styles from './index.module.css';
import BasicBreadcrumbs from "@/components/Breadcrumbs";
import AnimatedPage from "@/components/AnimatedPage";
import { Breadcrumbs } from "@mui/material";

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
            <Breadcrumbs aria-label="breadcrumb" sx={{ margin: '1rem' }}>
                <a href="/">Home</a>
                <a href="/products">Products</a>
                <a href={"/products/&candles"}>Candles</a>
            </Breadcrumbs>
            <AnimatedPage>
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
            </AnimatedPage>
        </>
    )
}

