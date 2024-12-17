'use client';
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import { CardProps } from '../ProductPageCard/types';
import ProductCounter from '../Counter';
import AddToCartButton from '../AddToCartButton';


export const AutoGrid : React.FC<CardProps> = ({ name, description, price, stock, image, category}) => {   

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
              <p className="mb-4">Category: {category.name}</p>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <ProductCounter />
              <AddToCartButton />
            </div>
        </Grid>
      </Grid>  

    </>

  );
}

export default AutoGrid;
