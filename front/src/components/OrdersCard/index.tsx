"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import getToken from "@/helpers/getToken";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { IOrder } from "@/interfaces/IOrder";
import { OrderProductsCard } from "../OrderProductsCard";

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
      console.log(response.data);
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
        <div key={orders.length}>
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
                {order.orderProducts.map((op) => (
                  <OrderProductsCard
                  key={`${order.id}-${op.product.id}`}
                  product={op.product} 
                  productQuantity={op.quantity} 
                  />
                ))}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        </div>
      )}
    </>
  );
}


