'use client';
import React from "react";
import styles from "./index.module.css";
import { CardProps } from "./types";
import ProductCounter from "../Counter";
import { Button, IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useCart } from "../hooks";


export const Card: React.FC<CardProps> = ({ id, name, description, price, stock, image, category }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = React.useState<number>(1);

    const handleAddToCart = (productId: number) => {
        addToCart(productId, quantity);
      }
    
      const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
      };
    
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.image} />
            <div className={styles.cardBody}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.price}>
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)}
                </p>
                {stock > 0 ? (
            <>
            <ProductCounter onQuantityChange={handleQuantityChange}/>
            <div className='flex ml-auto mr-4 gap-4'>
            <IconButton
            size="small"
            sx={{
              justifyContent: 'center',
              borderRadius: '50px',
              padding: '5px',
              marginBottom: '10px',
              width: '2.2rem',
              color: 'white',
              backgroundColor: '#5f4b52',
              transition: 'background-color 0.3s ease',
              ':hover': { backgroundColor: '#7a5d64' },
              marginLeft: '14rem'
            }}
            onClick={() =>
              handleAddToCart(id)
            }
          >
            <Add sx={{  }} />
          </IconButton>
          </div>
          </>
        ) : (
            <Button className={styles.outOfStock}>
              Out of Stock
            </Button>
          )}
            </div>
        </div>
    )
};