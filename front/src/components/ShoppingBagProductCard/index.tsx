"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { IProduct } from "@/interfaces/IProduct";
import getProduct from "@/helpers/getProduct";
import { useCartContext } from "../../../context/CartContext";

interface ProductProps {
  product: IProduct;
  quantity: number;
}

export default function ShoppingBagProductCard() {
  const { productsInBag, removeFromCart } = useCartContext();
  const [removeProduct, setRemoveProduct] = useState<number | null>(null);
  const [detailedProducts, setDetailedProducts] = useState<ProductProps[]>([]);

  const [notification, setNotification] = useState<{
    open: boolean;
    severity: "success" | "error" | "info" | "warning";
    message: string;
  }>({ open: false, severity: "info", message: "" });

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

      const validProducts = fetched.filter(
        (item): item is ProductProps => item !== null
      );
      setDetailedProducts(validProducts);
    };

    fetchDetailedProducts();
  }, [productsInBag]);

  const handleRemoveProduct = (productId: number) => {
    setRemoveProduct(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setRemoveProduct(null);
      setNotification({
        open: true,
        severity: "info",
        message: "Product removed from your bag.",
      });
    }, 300);
  };

  const handleCloseNotification = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{
            width: "100%",
            backgroundColor: "#f0efef",
            color: "#333",
            border: "1px solid #C99690",
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {productsInBag.length === 0 ? (
        <Box
          textAlign="center"
          p={8}
        >
          <Typography variant="h5" sx={{ color: "#333", marginBottom: "1rem" }} fontFamily={"inherit"} fontWeight={300}>
            Your Shopping Bag is Empty
          </Typography>
          <Link href="/products/Candles" passHref>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#C99690",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#b3847c",
                },
                transition: "background-color 0.3s ease",
                textTransform: "none",
                paddingX: "2rem",
              }}
            >
              Go to Products
            </Button>
          </Link>
        </Box>
      ) : (
        <Box
          sx={{
            padding: "2rem",
            backgroundColor: "transparent",
            minHeight: "100vh",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#333", fontWeight: "light", fontFamily: "inherit", marginBottom: "1.5rem" }}
          >
            Your Shopping Bag
          </Typography>
          <AnimatePresence>
            {detailedProducts.map(({ product, quantity }) => (
              removeProduct !== product.id && (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginBottom: "1rem" }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      maxWidth: 600,
                      margin: "auto",
                      backgroundColor: "#fdfdfd",
                      borderRadius: "12px",
                      border: "1px solid #C99690",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={product.image}
                      alt={`Product ${product.name}`}
                      sx={{
                        width: 150,
                        height: 150,
                        objectFit: "cover",
                        backgroundColor: "#F0F0EA",
                      }}
                    />

                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          fontFamily={"inherit"}
                          fontWeight={500}
                          fontSize={20}
                          component="div"
                          sx={{ color: "#333"}}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="#555"
                          sx={{ fontWeight: 500, marginTop: "10px" }}
                        >
                          {product.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#555", fontWeight: 500 }}
                        >
                          Price:{" "}
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(product.price)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#555", fontWeight: 500 }}
                        >
                          Quantity: {quantity}
                        </Typography>
                      </CardContent>

                     <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          padding: "0 16px 16px 16px",
                        }}
                      >
                        <IconButton
                          aria-label="remove"
                          size="small"
                          onClick={() => handleRemoveProduct(product.id)}
                          sx={{ color: "#C99690" }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </Box>
      )}
    </>
  );
}
