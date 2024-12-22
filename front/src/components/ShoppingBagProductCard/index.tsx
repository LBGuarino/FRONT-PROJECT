'use client';
import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import getProduct from "@/helpers/getProduct";
import { useCart } from "../hooks";

export default function ShoppingBagProductCard() {
  const { productsInBag, removeFromCart } = useCart();
  const [removeProduct, setRemoveProduct] = useState<number | null>(null);
  const [detailedProducts, setDetailedProducts] = useState<any[]>([]);

  const handleRemoveProduct = (productId: number) => {
    setRemoveProduct(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setRemoveProduct(null);
    }, 300);
  };

  useEffect(() => {
    // Obtener los datos completos de los productos
    const fetchProducts = async () => {
      const fetchedProducts = await Promise.all(
        productsInBag.map(async (product) => {
          try {
            const detailedProduct = await getProduct(product.id);
            return { ...detailedProduct, quantity: product.quantity };
          } catch (error) {
            console.error(`Error fetching product ${product.id}:`, error);
            return null;
          }
        })
      );

      setDetailedProducts(fetchedProducts.filter((p) => p !== null));
    };

    fetchProducts();
  }, [productsInBag]);

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
          {detailedProducts.map((product) => (
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
                      alt="product image"
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
                        Quantity: {product.quantity}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Box display="flex" justifyContent="flex-end" p={1}>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
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
