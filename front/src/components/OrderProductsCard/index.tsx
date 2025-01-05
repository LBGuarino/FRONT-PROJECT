import { IProduct } from "@/interfaces/IProduct";
import { CardContent, CardMedia, Typography, Box } from "@mui/material";
import React from "react";

export const OrderProductsCard: React.FC<{
  product: IProduct;
  productQuantity?: number;
}> = ({ product, productQuantity }) => {
  const { id, name, price, image } = product;
  const quantity = productQuantity;

  return (
    <Box
      key={id}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        marginBottom: "1rem",
      }}
    >
      <CardMedia
        component="img"
        src={image}
        alt={name}
        sx={{
          width: 80,
          height: 80,
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Price:{" "}
          {new Intl.NumberFormat("en-US", {
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
              Total Price:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(price * quantity)}
            </Typography>
          </>
        )}
      </CardContent>
    </Box>
  );
};
