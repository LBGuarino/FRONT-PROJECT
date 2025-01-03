'use client';
import { Button, Snackbar, SnackbarOrigin } from "@mui/material";
import { useCartContext } from "context/CartContext";
import { useState } from "react";

interface LandingAddButtonProps {
    productId: number;
    quantity: number;
}

export default function LandingAddButton({ productId, quantity }: LandingAddButtonProps) {
    const { addToCart } = useCartContext();
    const [state, setState] = useState<{
        open: boolean;
        vertical: SnackbarOrigin['vertical'];
        horizontal: SnackbarOrigin['horizontal'];
      }>({
        open: false,
        vertical: 'top',
        horizontal: 'right',
      });
    
      const { vertical, horizontal, open } = state;
    
      const handleClick = (
        newState: SnackbarOrigin,
      ) => {
        setState({ open: true, ...newState });
      };

      const handleClose = () => {
        setState({ ...state, open: false });
      };
    
    
    const handleAddToCart = () => {
        addToCart(productId, quantity);
        handleClick({ vertical: 'top', horizontal: 'right' });
    };

    return (
        <>
        <Button className="bg-slate-500 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded" onClick={handleAddToCart}>
        Add to Cart
        </Button>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="Product/s added to Bag"
                key={Date.now()}
              />
        </>
        
    );
}
