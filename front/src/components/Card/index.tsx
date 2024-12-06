import React from "react";
import { categories } from "./utils";

// types
import { CardProps } from "./types";


export const Card: React.FC<CardProps> = ({ name, description, price, stock, image, categoryId }) => {
    return (
        <>
            <div className="card">
                <img src={image} alt={name} />
                <div className="card-body">
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p>Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
                    <p>Stock: {stock}</p>
                    <p>Category: {categories[categoryId] || "Unknown"}</p>
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </>
    )
};