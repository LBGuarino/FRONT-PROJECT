"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import getToken from "@/helpers/getToken";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { IOrder } from "@/interfaces/IOrder";
import { OrderProductsCard } from "../OrderProductsCard";

const calculateOrderTotal = (order: IOrder) => {
  return order.orderProducts.reduce(
    (total, op) => total + op.product.price * op.quantity,
    0
  );
};

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
        <Typography variant="h6" align="center" sx={{ color: "#888", marginTop: "2rem" }}>
          Here you can find your ongoing orders
        </Typography>
      ) : (
        <AnimatePresence>
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full p-2" 
            >
              <Card
                sx={{
                  width: "100%", 
                  backgroundColor: "#fdfdfd",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order ID: {order.id}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Status: {order.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Date: {new Date(order.date).toLocaleDateString()}
                  </Typography>
                  <Divider sx={{ margin: "1rem 0" }} />
                  {order.orderProducts.map((op) => (
                    <OrderProductsCard
                      key={`${order.id}-${op.product.id}`}
                      product={op.product}
                      productQuantity={op.quantity}
                    />
                  ))}
                  <Divider sx={{ margin: "1rem 0" }} />
                  <Typography variant="h6" align="right" sx={{ color: "#333" }}>
                    Total:{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(calculateOrderTotal(order))}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </>
  );
}
