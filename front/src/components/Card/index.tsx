import React from "react";
import styles from "./index.module.css";

// types
import { CardProps } from "./types";
import LandingAddButton from "../LandingAddButton";


export const Card: React.FC<CardProps> = ({ id, name, description, price, stock, image, category }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.image} />
            <div className={styles.cardBody}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.price}>
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)}
                </p>
                {stock > 0 ? (
                    <LandingAddButton productId={id} quantity={1} />
                ) : (
                    <button className={styles.outOfStock}>Out of Stock</button>
                )}
            </div>
        </div>
    )
};