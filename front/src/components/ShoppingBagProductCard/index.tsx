'use client';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useCart } from "../hooks";


export default function ShoppingBagProductCard() {
  const { productsInBag } = useCart();
    
  return (
    <>
      {productsInBag.length === 0 ? (
        <p>Your bag is empty</p>
          ) : (
          <>
          {productsInBag.map((product) => (
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
            </Card>
            ))}
          </>
        )}
      </>
    );
}
