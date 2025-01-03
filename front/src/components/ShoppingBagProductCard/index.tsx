"use client";

import { useEffect, useState } from "react";
import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { IProduct } from "@/interfaces/IProduct";
import getProduct from "@/helpers/getProduct";
import { useCartContext } from "../../../context/CartContext";

interface ProductProps {
  product: IProduct;
  quantity: number;
}

export default function ShoppingBagPage() {
  const { productsInBag, removeFromCart } = useCartContext();
  const [removeProduct, setRemoveProduct] = useState<number | null>(null);
  const [detailedProducts, setDetailedProducts] = useState<ProductProps[]>([]);

  // Cargar detalles de cada producto cuando cambie el carrito
  useEffect(() => {
    const fetchDetailedProducts = async () => {
      const fetched = await Promise.all(
        productsInBag.map(async ({ id, quantity }) => {
          const product = await getProduct(id);
          if (product) {
            return { product, quantity };
          }
          return null;
        })
      );

      // Filtra los nulos (en caso de errores en el fetch)
      const validProducts = fetched.filter((item) => item !== null) as ProductProps[];
      setDetailedProducts(validProducts);
    };

    fetchDetailedProducts();
  }, [productsInBag]);

  // Quitar un producto con animación
  const handleRemoveProduct = (productId: number) => {
    setRemoveProduct(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setRemoveProduct(null);
    }, 300);
  };

  return (
    <>
      {productsInBag.length === 0 ? (
        <Box textAlign="center" p={4}>
          <p>Your bag is empty</p>
          <Link href="/products" className="text-blue-500 p-4 hover:underline">
            Go to products
          </Link>
        </Box>
      ) : (
        <AnimatePresence>
          {detailedProducts.map(({ product, quantity }) => (
            removeProduct !== product.id && (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: "1rem" }}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      src={product.image}
                      alt={`Product ${product.name}`}
                      style={{ height: 140 }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(product.price)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Quantity: {quantity}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Box display="flex" justifyContent="flex-end" p={1}>
                    <IconButton aria-label="delete" size="small" onClick={() => handleRemoveProduct(product.id)}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Card>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      )}
    </>
  );
}
