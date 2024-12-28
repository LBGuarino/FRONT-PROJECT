"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import getToken from "@/helpers/getToken";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { IOrder } from "@/interfaces/IOrder";

export default function OrderGrid() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { user } = useUser();
  const authSub = user?.sub;

  const getOrders = async () => {
    try {
      const token = await getToken();
      const response = await axios.get("http://localhost:3001/users/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
          auth0Sub: authSub,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {!orders.length ? (
        <p>Here you can find your ongoing orders</p>
      ) : (
        <AnimatePresence>
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: "1rem" }}
            >
              <Card sx={{ maxWidth: 600, margin: "auto", marginBottom: "1rem" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order ID: {order.id}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Status: {order.status}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Date: {new Date(order.date).toLocaleDateString()}
                  </Typography>
                </CardContent>

                {order.products.map((product) => {
                    console.log(product)
                  const productQuantity = order.productsQuantity?.find(
                    (pq) => pq.id === product.id
                  )?.quantity;

                  console.log(productQuantity)

                  return (
                    <CardActionArea key={product.id} sx={{ display: "flex", justifyContent: "center" }}>
                      <CardMedia
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{ width: 120, height: 120 }}    
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price: {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(product.price)}
                        </Typography>
                        {productQuantity !== undefined && (
                        <>
                        <Typography variant="body2" color="text.secondary">
                            Quantity: {productQuantity}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Total Price: {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(product.price * productQuantity)}
                        </Typography>
                        </>                          
                        )}
                      </CardContent>
                    </CardActionArea>
                  );
                })}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </>
  );
}


