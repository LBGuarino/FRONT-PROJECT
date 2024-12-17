import IconButton from '@mui/material/IconButton';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default function AddToCartButton() {
  return (
    <IconButton size="small" sx={{ justifyContent: 'center', borderRadius: '10px', padding: '5px', width: '22rem', color: 'white', backgroundColor: '#5f4b52', transition: 'background-color 0.3s ease',
    ":hover": { backgroundColor: '#7a5d64' }}}>
      Add to Bag
      <ShoppingBasketIcon sx={{ marginLeft: '5px' }} />
    </IconButton>
  );
}
