'use client';
import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import styles from './index.module.css';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Alert } from '@mui/material';
import { useCartContext } from 'context/CartContext';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


export default function ShoppingBag() {
  const { user, error } = useUser();
  const { productsInBag } = useCartContext();
  const totalItems = productsInBag.reduce((sum, product) => sum + product.quantity, 0);
  
  return (
    <>  
    {error && <Alert severity="error"> Error: {error.message} </Alert>}
    {user ?
        <Link href="/shopping&bag" className={styles.text}>
            <span>
                <StyledBadge badgeContent={totalItems} color="secondary">
                <img src="/icons/shopbag.svg" width={22} height={22} alt='shopping bag'/> 
                </StyledBadge>
                Shopping Bag
            </span>
        </Link> : null}
    </>
  );
}
