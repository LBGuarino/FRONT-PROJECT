import { IProduct } from "@/interfaces/IProduct";
import { CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export const OrderProductsCard: React.FC<{ product: IProduct; productQuantity?: number }> = ({ product, productQuantity }) => {

    const { id, name, price, image } = product;
    const quantity = productQuantity;

    return (
        <div>
            <CardActionArea key={id} sx={{ display: "flex", justifyContent: "center" }}>
                <CardMedia
                component="img"
                src={image}
                alt={name}
                sx={{ width: 120, height: 120 }}    
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        }).format(price)}
                    </Typography>
                        {quantity !== undefined && (
                        <>
                        <Typography variant="body2" color="text.secondary">
                            Quantity: {quantity}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Total Price: {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(price * quantity)}
                        </Typography>
                        </>                          
                        )}
                      </CardContent>
                    </CardActionArea>

        </div>
    )
}