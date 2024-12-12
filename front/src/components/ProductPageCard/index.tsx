import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { CardProps } from './types';
import styles from './index.module.css'

export const ProductCard: React.FC<CardProps> = ({ name, description, price, stock, image, categoryId }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea sx={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <CardMedia
          component="img"
          src={image}
          alt="product image"
        />
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
            <Button className={styles.addToCart}>
              Add to Cart
            </Button>
          ) : (
            <Button className={styles.outOfStock}>
              Out of Stock
            </Button>
          )}

      </CardActionArea>
      <CardActions>
        <Button size="small" className={styles.share}>
          Share
        </Button>
      </CardActions>
    </Card>
  );
}


