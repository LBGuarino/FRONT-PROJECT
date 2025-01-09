'use client';
import Grid from '@mui/material/Grid2';
import { CardProps } from '../ProductPageCard/types';
import ProductCounter from '../Counter';
import { IconButton, Snackbar, SnackbarOrigin } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useCartContext } from '../../../context/CartContext';
import { useState } from 'react';

export const AutoGrid: React.FC<CardProps> = ({ id, name, price, image, category }) => {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState<number>(1);
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

  const handleAddToCart = (productId: number) => {
      addToCart(productId, quantity);
      handleClick({ vertical: 'top', horizontal: 'right' });
    }

  return (
    <>
      <Grid container spacing={3} columns={16} sx={{ flexGrow: 1, justifyContent: 'center' }}>
        <Grid size={6}>
          <img src={image} alt="product image" />
        </Grid>
        <Grid
          size={6}
          sx={{
            textAlign: 'left',
            alignContent: 'center',
            marginLeft: '10px',
            textSizeAdjust: '100%',
            fontSize: '18px',
            fontWeight: 'light',
            color: 'black',
          }}
        >
          <div className="flex flex-col justify-center font-sans">
            <h1 className="text-2xl font-semibold uppercase text-left mb-10 w-fit">
              {name}
            </h1>
            <p>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}
            </p>
            <p className="mt-4 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae atque mollitia magni
              asperiores sit laboriosam tempore nulla a reprehenderit minus id veritatis,
              architecto placeat ad debitis delectus quo deleniti laborum!
            </p>
            <p className="mb-4">Category: {category.name || 'Uncategorized'}</p>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <ProductCounter 
            quantity={quantity}
            setQuantity={setQuantity}
            />
            <IconButton
              size="small"
              sx={{
                justifyContent: 'center',
                borderRadius: '10px',
                padding: '5px',
                width: '22rem',
                color: 'white',
                backgroundColor: '#5f4b52',
                transition: 'background-color 0.3s ease',
                ':hover': { backgroundColor: '#7a5d64' },
              }}
              onClick={() =>
                handleAddToCart(id)
              }
            >
              Add to Bag
              <ShoppingBasketIcon sx={{ marginLeft: '5px' }} />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Product/s added to Bag"
        key={Date.now()}
      />
    </>
  );
};

export default AutoGrid;
