import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { mainCategories } from './utils';
import { ListItemText } from '@mui/material';
import styles from './index.module.css'

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleMouseEnter = (categoryId: number) => {
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null); 
  };

  const DrawerList = (
    <Box sx={{ width: 400, marginTop: '8em' }} role="presentation">
      <div style={{marginBottom: '1em',marginTop:'-8.5em', display: 'flex', justifyContent: 'center'}} className={styles.logoContainer}>
        <a href="/"><img src="/images/logo.svg" className={styles.logo}/></a>
      </div>
      <List>
        {mainCategories.map((category) => (
          <div
            key={category.id}
            onMouseEnter={() => handleMouseEnter(category.id)}
            onMouseLeave={handleMouseLeave} 
            style={{ marginBottom: '10px', position: 'relative' }}
          >
            {/* Categoría principal */}
            <ListItem 
            className={styles.mainCategory}
            sx={{
              display: 'flex',
              padding:'0.2em'
            }}>
              <ListItemButton component='a' href={category.path}>
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{
                    textAlign: 'right',
                  }}
                  sx={{
                    textAlign: 'right',
                  }}
                  classes={{ primary: styles.mainCategoryText }}
                />
              </ListItemButton>
            </ListItem>

            {/* Subcategorías */}
            <div
              style={{
                maxHeight: hoveredCategory === category.id ? '300px' : '0px', 
                overflow: 'hidden',
                transition: 'max-height 0.7s ease-in-out', 
                backgroundColor: 'transparent', 
                zIndex: 1,
                width: '100%',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <List>
                {category.subCategories.map((sub) => (
                  <ListItem key={sub.id} disablePadding>
                    <ListItemButton
                      className={styles.subCategoryButton}
                      component="a"
                      href={`/${category.name.toLowerCase()}/${sub.name
                        .toLowerCase()
                        .replace(/ /g, '-')}`}
                    >
                      <ListItemText primary={sub.name}
                      classes={{ primary: styles.subCategoryText }}/>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div style={{display: 'flex', marginRight: '10em', marginLeft: '-5em', backgroundColor: 'inherit'}}>
      <Button style={{backgroundColor: 'transparent', border: 'none', borderRadius: '40px', color: 'white',marginLeft: '1em'}} onClick={toggleDrawer(true)}>
        <img src="/icons/menuicon.svg" width={30} height={21}/>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#f1f3f8',
        },
      }}
    >
        {DrawerList}
      </Drawer>
    </div>
  );
}



