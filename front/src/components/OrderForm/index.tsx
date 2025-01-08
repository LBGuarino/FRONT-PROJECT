"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCartContext } from "../../../context/CartContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import getToken from "@/helpers/getToken";
import axios from "axios";
import PaymentBox from "../PaymentBox";
import { IProduct } from "@/interfaces/IProduct";
import getProduct from "@/helpers/getProduct";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface ProductProps {
  product: IProduct;
  quantity: number;
}

export default function OrderForm() {
  const { productsInBag, clearCart } = useCartContext();
  const { user } = useUser();

  const [form, setForm] = useState({
    shipmentMethod: "deliver",
    name: "",
    email: user?.email || "",
    address1: "",
    address2: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [detailedProducts, setDetailedProducts] = useState<ProductProps[]>([]);

  const [notification, setNotification] = useState<{
    open: boolean;
    severity: "success" | "error" | "info" | "warning";
    message: string;
  }>({ open: false, severity: "info", message: "" });

  const calculateTotalPrice = () => {
    return detailedProducts.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const totalPrice = calculateTotalPrice();

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

    if (productsInBag.length > 0) {
      fetchDetailedProducts();
    }
  }, [productsInBag, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const validProducts = productsInBag.map((product) => ({
      id: product.id,
      quantity: product.quantity,
    }));

    try {
      const token = await getToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          products: validProducts,
          auth0Sub: user?.sub,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setNotification({
          open: true,
          severity: "success",
          message: "¡Order submitted successfully!",
        });
        clearCart();
        setForm({
          shipmentMethod: "deliver",
          name: "",
          email: user?.email || "",
          address1: "",
          address2: "",
          city: "",
          zipCode: "",
          country: "",
        });
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: unknown) {
      let errorMessage: string = "An error occured"

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setNotification({
        open: true,
        severity: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
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

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
    clearCart();
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
            backgroundColor: "#fdfdfd",
            color: "#333",
            border: "1px solid #C99690",
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {productsInBag.length === 0 ? (
        <DotLottieReact       
        src="https://lottie.host/173f3c94-3834-4213-9c65-ea6bcf075493/2mntbggp11.lottie"
        loop
        autoplay 
        className="w-3/4 h-3/4 justify-center mt-10 ml-40"
        />
      ) : (
        <Card
          sx={{
            padding: "2rem",
            backgroundColor: "#fdfdfd",
            borderRadius: "12px",
            border: "1px solid #C99690",
            maxWidth: "800px",
            margin: "2rem auto",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <Typography variant="h6" sx={{ color: "#333" }}>
              Account: {user?.email}
            </Typography>
            <Button
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                backgroundColor: "#C99690",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#b3847c",
                },
                textTransform: "none",
                padding: "6px 12px",
              }}
            >
              Log Out
            </Button>
          </Box>

          <Divider sx={{ marginBottom: "1.5rem" }} />

          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">Deliver Method</FormLabel>
                <RadioGroup
                  row
                  aria-label="shipment method"
                  name="shipmentMethod"
                  value={form.shipmentMethod}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="deliver"
                    control={
                      <Radio
                        sx={{
                          color: "#C99690",
                          "&.Mui-checked": { color: "#C99690" },
                        }}
                      />
                    }
                    label="Shipment"
                  />
                  <FormControlLabel
                    value="pickup"
                    control={
                      <Radio
                        sx={{
                          color: "#C99690",
                          "&.Mui-checked": { color: "#C99690" },
                        }}
                      />
                    }
                    label="Pick-Up"
                  />
                </RadioGroup>
              </FormControl>

              <Box sx={{ display: "flex", gap: "1.5rem" }}>
                <TextField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fdfdfd",
                  }}
                />
                <TextField
                  label="E-mail"
                  name="email"
                  value={form.email}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fdfdfd",
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <TextField
                  label="Address Line 1"
                  name="address1"
                  value={form.address1}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fdfdfd",
                  }}
                />
                <TextField
                  label="Address Line 2"
                  name="address2"
                  value={form.address2}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fdfdfd",
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", gap: "1.5rem" }}>
                <TextField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fdfdfd",
                  }}
                />
                <TextField
                  label="ZIP Code"
                  name="zipCode"
                  value={form.zipCode}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fdfdfd",
                  }}
                />
                <TextField
                  label="Country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fdfdfd",
                  }}
                />
              </Box>

              <Box>
                <PaymentBox/>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: "#333"}} fontFamily={"inherit"} fontWeight={"bold"}>
                  Total:{" "}
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  }).format(totalPrice)}
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#C99690",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#b3847c",
                  },
                  transition: "background-color 0.3s ease",
                  textTransform: "none",
                  paddingY: "12px",
                  fontSize: "1rem",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting Order" : "Submit Order"}
              </Button>
            </Box>
          </form>

          <Divider sx={{ marginTop: "1.5rem" }} />
        </Card>
      )}
    </>
  );
}
