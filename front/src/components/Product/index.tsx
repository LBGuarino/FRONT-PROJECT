'use client';
import Grid from '@mui/material/Grid2';
import { CardProps } from '../ProductPageCard/types';
import ProductCounter from '../Counter';
import { IconButton } from '@mui/material'; 
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { IProduct } from '@/interfaces/IProduct';
import { useCart } from '../hooks';


export const AutoGrid : React.FC<CardProps> = ({ name, description, price, stock, image, category}) => {
const { addToCart } = useCart();

    const handleAddToCart = (product: IProduct) => {
        if (product.stock === 0) {
          return  alert('Out of stock');
        }
        addToCart(product);
      }

  return (
    <>
      <Grid container spacing={3} columns={16} sx={{ flexGrow: 1, justifyContent: 'center' }}>
        <Grid size={6}>
            <img src= {image} alt="product image" />
        </Grid>

        <Grid size={6} sx={{ textAlign: 'left', alignContent: 'center', marginLeft: '10px',
            textSizeAdjust: '100%', fontSize: '18px', fontWeight: 'light', color: 'black'
          }}>
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-semibold uppercase text-left mb-10 w-fit">
                {name}
              </h1>
              <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
              <p className="mt-4 mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Beatae atque mollitia magni asperiores sit laboriosam tempore nulla a 
                reprehenderit minus id veritatis, architecto placeat ad debitis delectus 
                quo deleniti laborum!</p>
              <p className="mb-4">Category: {category.name || 'Uncategorized'}</p>  
            </div>
          

            <div className="flex justify-center gap-4 mt-4">
              <ProductCounter />
              <IconButton size="small" sx={{ justifyContent: 'center', borderRadius: '10px', padding: '5px', width: '22rem', color: 'white', backgroundColor: '#5f4b52', transition: 'background-color 0.3s ease',
                ":hover": { backgroundColor: '#7a5d64' }}}
                onClick={() => handleAddToCart({ id: Date.now(), name, description, price, stock, image, category })}>
                  Add to Bag
                  <ShoppingBasketIcon sx={{ marginLeft: '5px' }} />
              </IconButton>

            </div>
        </Grid>
      </Grid>
    </>
  );
}

export default AutoGrid;
