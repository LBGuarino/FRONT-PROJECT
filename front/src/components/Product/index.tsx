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

  const handleClick = (newState: SnackbarOrigin) => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleAddToCart = (productId: number) => {
    addToCart(productId, quantity);
    handleClick({ vertical: 'top', horizontal: 'right' });
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        columns={16}
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 2, md: 4 },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Grid
          size={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '100%', md: '50%' },
            marginBottom: { xs: 2, md: 0 },
          }}
        >
          <img
            src={image}
            alt="product image"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '10px',
              objectFit: 'cover',
            }}
          />
        </Grid>

        <Grid
          size={6}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
            paddingLeft: { md: 2 },
            color: '#333',
            fontSize: '16px',
            lineHeight: '1.5',
          }}
        >
          <div className="flex flex-col justify-center font-sans">
            <h1 className="text-xl md:text-2xl font-semibold uppercase text-left mb-4">
              {name}
            </h1>
            <p className="text-lg font-medium">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}
            </p>
            <p className="mt-4 mb-4 text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae atque mollitia magni
              asperiores sit laboriosam tempore nulla a reprehenderit minus id veritatis,
              architecto placeat ad debitis delectus quo deleniti laborum!
            </p>
            <p className="mb-4 text-sm text-gray-600">
              Category: {category.name || 'Uncategorized'}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center md:justify-start gap-4 mt-4">
            <ProductCounter quantity={quantity} setQuantity={setQuantity} />
            <IconButton
              size="medium"
              sx={{
                justifyContent: 'center',
                borderRadius: '10px',
                padding: '10px 16px',
                width: { xs: '100%', md: 'auto' },
                color: 'white',
                backgroundColor: '#5f4b52',
                transition: 'background-color 0.3s ease',
                ':hover': { backgroundColor: '#7a5d64' },
                fontSize: '16px',
              }}
              onClick={() => handleAddToCart(id)}
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
