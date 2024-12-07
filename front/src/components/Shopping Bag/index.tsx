import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import styles from './index.module.css';
import Link from 'next/link';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function ShoppingBag() {
  return (
    <>
        <Link href="/cart" className={styles.text}>
            <span>
                <StyledBadge badgeContent={2} color="secondary">
                <img src="/icons/shopbag.svg" width={22} height={22}/> 
                </StyledBadge>
                Shopping Bag
            </span>
        </Link>
    </>
  );
}
