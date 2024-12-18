'use client';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { IProduct } from "@/interfaces/IProduct";
import getToken from "@/helpers/getToken";


export default function ShoppingBagProductCard() {

    const [products, setProducts] = useState<IProduct[]>([]);
    const { user, error, isLoading } = useUser();

    useEffect(() => {
            const fetchOrders = async () => {
              try {
                  const token = await getToken();
                  const ordersResponse = await fetch("http://localhost:3001/users/orders", {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  });
        
                  if (!ordersResponse.ok) {
                    throw new Error("Failed to fetch orders");
                  }
        
                  const data = await ordersResponse.json();
                  setProducts(data);
                }
                catch (err) {
                console.error("Error fetching orders:", err);
              }
            };
        
            fetchOrders();
          }, [user]);

    return (
        <>
        {products.map((product: IProduct) => (
          <Card key={product.id} sx={{ maxWidth: 345 }}>
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
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                    product.price
                  )}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Button>{product.stock > 0 ? "Add to Cart" : "Out of Stock"}</Button>
          </Card>
        ))}
      </>
    );
  }

