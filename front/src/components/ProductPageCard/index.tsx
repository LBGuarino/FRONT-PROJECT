'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { CardProps } from './types';
import styles from './index.module.css'
import { useCartContext } from '../../../context/CartContext';
import { Divider, IconButton, Snackbar, SnackbarOrigin } from '@mui/material';
import Add from '@mui/icons-material/Add';
import ProductCounter from '../Counter';
import WishlistButton from '../AddToWishlistButton';

export const ProductCard: React.FC<CardProps> = ({ id, name, description, price, stock, image }) => {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = React.useState<number>(1);
  const [state, setState] = React.useState<{
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


  const handleWishlistChange = (added: boolean) => {
    console.log(added);
  };


  return (
    <>
      <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
         backgroundColor: '#ffffff'}}>
          <CardMedia
            component="img"
            src={image}
            alt="product image"
          />
          <Divider sx={{ margin: '0.2rem', backgroundColor: '#5f4b52', width: '80%' }} />
          <CardContent className={styles.content}>
            <Typography gutterBottom variant="h5" component="div" className={styles.name}>
              {name}
            </Typography>
            <Typography variant="body2" className={styles.description}>
              {description}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}
            </Typography>
          </CardContent>
          {stock > 0 ? (
            <>
            <ProductCounter 
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <div className='flex mr-auto ml-5'>
              <WishlistButton onAddToWishlist={handleWishlistChange} />
            </div>
            <div className='flex ml-auto mr-4 gap-4'>
            <IconButton
            size="small"
            sx={{
              justifyContent: 'center',
              borderRadius: '50px',
              padding: '5px',
              marginBottom: '10px',
              width: '3rem',
              color: 'white',
              backgroundColor: '#5f4b52',
              transition: 'background-color 0.3s ease',
              ':hover': { backgroundColor: '#7a5d64' },
            }}
            onClick={() =>
              handleAddToCart(id)
            }
          >
            <Add sx={{  }} />
          </IconButton>
          </div>
          </>
        ) : (
            <Button className={styles.outOfStock}>
              Out of Stock
            </Button>
          )}

        <CardActions sx={{ display: 'flex', marginRight: 'auto', alignItems: 'center' }}>
          <Button size="small" className={styles.share}>
            Share
          </Button>
        </CardActions>
      </Card>
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


