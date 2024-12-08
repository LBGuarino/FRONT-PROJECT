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
    <Box sx={{ width: 430 }} role="presentation">
      <List>
        {mainCategories.map((category) => (
          <div
            key={category.id}
            onMouseEnter={() => handleMouseEnter(category.id)}
            onMouseLeave={handleMouseLeave} 
            style={{ marginBottom: '10px', position: 'relative' }} 
          >
            {/* Categoría principal */}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{
                    fontWeight: hoveredCategory === category.id ? 'bold' : 'normal',
                  }}
                />
              </ListItemButton>
            </ListItem>

            {/* Subcategorías */}
            <div
              style={{
                maxHeight: hoveredCategory === category.id ? '300px' : '0px', 
                overflow: 'hidden',
                transition: 'max-height 0.7s ease-in-out', 
                backgroundColor: 'white', 
                zIndex: 1,
                width: '100%',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
              }}
            >
              <List sx={{ pl: 4 }}>
                {category.subCategories.map((sub) => (
                  <ListItem key={sub.id} disablePadding>
                    <ListItemButton
                      component="a"
                      href={`/${category.name.toLowerCase()}/${sub.name
                        .toLowerCase()
                        .replace(/ /g, '-')}`}
                    >
                      <ListItemText primary={sub.name} />
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
    <div style={{display: 'flex', marginRight: '10em', marginLeft: '-5em'}}>
      <Button style={{backgroundColor: 'transparent', border: 'none', borderRadius: '40px', color: 'white',marginLeft: '1em'}} onClick={toggleDrawer(true)}>
        <img src="/icons/menuicon.svg" width={30} height={21}/>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}



