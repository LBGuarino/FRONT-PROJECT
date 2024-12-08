import React from "react";
import { categories } from "./utils";
import styles from "./index.module.css";

// types
import { CardProps } from "./types";


export const Card: React.FC<CardProps> = ({ name, description, price, stock, image, categoryId }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.image} />
            <div className={styles.cardBody}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.price}>
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)}
                </p>
                {stock > 0 ? (
                    <button className={styles.addToCart}>Add to Cart</button>
                ) : (
                    <button className={styles.outOfStock}>Out of Stock</button>
                )}
            </div>
        </div>
    )
};