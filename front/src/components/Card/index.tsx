'use client';
import React, { useState } from "react";
import styles from "./index.module.css";
import { CardProps } from "./types";
import ProductCounter from "../Counter";
import { Button, IconButton, Tooltip } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useCartContext } from "../../../context/CartContext";
import WishlistButton from "../AddToWishlistButton";
import { motion } from 'framer-motion'

export const Card: React.FC<CardProps> = ({
  id,
  name,
  description,
  price,
  stock,
  image,
}) => {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = React.useState<number>(1);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);

  const handleWishlistChange = (added: boolean) => {
    console.log(added);
  };

  const handleAddToCart = (productId: number) => {
    if (isBouncing) return;
    addToCart(productId, quantity);
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.cardBody}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.price}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </p>
          <p className={styles.description}>{description}</p>
        {stock > 0 ? (
          <>
            <ProductCounter 
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <WishlistButton onAddToWishlist={handleWishlistChange} />
            <div className="flex ml-auto mr-4 gap-4">
              <Tooltip title="Add to Bag" aria-label="Add to Bag">
              <IconButton
                size="small"
                sx={{
                  justifyContent: "center",
                  borderRadius: "50px",
                  padding: "5px",
                  marginBottom: "10px",
                  width: "2.2rem",
                  color: "white",
                  backgroundColor: "#5f4b52",
                  transition: "background-color 0.3s ease",
                  ":hover": { backgroundColor: "#7a5d64" },
                  marginLeft: "14rem",
                }}
                onClick={() => handleAddToCart(id)}
                className={isBouncing ? styles.bounce : ""}
              >
                <Add />
              </IconButton>
              </Tooltip>
            </div>
          </>
        ) : (
          <Button className={styles.outOfStock}>Out of Stock</Button>
        )}
      </div>
    </div>
    </motion.div>
  );
};
