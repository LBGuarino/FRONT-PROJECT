'use client';

import axios from "axios";
import getToken from "@/helpers/getToken";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { IOrder } from "@/interfaces/IOrder";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

export default function OrderCard() {
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
      console.error(error);
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
                <Card sx={{ maxWidth: 200, maxHeight: 200, margin: "auto" }}>
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
                  const productQuantity = order.productsQuantity?.find(
                    (pq) => pq.id === product.id
                  )?.quantity;

                  return (
                    <CardActionArea key={product.id}>
                      <CardMedia
                        component="img"
                        src={product.image}
                        alt={product.name}
                        style={{ height: 140 }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price:{" "}
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(product.price)}
                        </Typography>
                        {productQuantity !== undefined && (
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {productQuantity}
                          </Typography>
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
