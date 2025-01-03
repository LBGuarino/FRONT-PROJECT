"use client"
import React, { useEffect, useState } from "react";
import { IProduct } from "@/interfaces/IProduct";
import { getProducts } from "@/helpers/getProducts";
import { ProductCard } from "@/components/ProductPageCard";
import styles from './index.module.css';
import AnimatedPage from "@/components/AnimatedPage";
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";

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
                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
                <Link href={"/products/&candles"}>Candles</Link>
            </Breadcrumbs>
            <AnimatedPage>
            <div className={styles.cardsContainer}>
              {products.map(({id, name, description, price, stock, image, category}) => (
                        <ProductCard
                        id={id}
                        key={id}
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

