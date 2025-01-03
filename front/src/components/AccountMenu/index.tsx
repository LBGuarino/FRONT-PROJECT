import * as React from 'react';
import { Divider, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Drawer } from '@mui/material';
import { dashboardProperties } from "./DashboardProperties";
import styles from "./index.module.css"
import { useCartContext } from 'context/CartContext';

export default function AccountMenu() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [hoveredCategory, setHoveredCategory] = React.useState<number | null>(null);
  
  const { user } = useUser();
  const { clearCart } = useCartContext()

  const handleMouseEnter = (propertyId: number) => {
    setHoveredCategory(propertyId);
    };
  
  const handleMouseLeave = () => {
    setHoveredCategory(null); 
    };

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
    clearCart();
  };

  const DrawerList = (

    <Box sx={{ width: 300, marginTop: '8em' }} role="presentation">

      <div className="flex justify-center"> 
          <img src={user?.picture || undefined} className="w-1/3 h-1/3 rounded-full -mt-16 mb-8" alt="profile picture" />
      </div>

      <p className={styles.text}> Welcome {user?.name} 👋 </p>
      <Divider />
      <List>
        {dashboardProperties.map((property) => (
          <div
            key={property.id}
            onMouseEnter={() => handleMouseEnter(property.id)}
            onMouseLeave={handleMouseLeave} 
            style={{ marginBottom: '10px', position: 'relative' }}>
            
            <ListItem 
              className={styles.mainCategory}
              sx={{
              display: 'flex',
              padding:'0.2em'
              }}>
              <ListItemButton component='a'>
                <ListItemText
                primary={property.name}
                primaryTypographyProps={{
                  textAlign: 'left',
                }}
                sx={{
                  textAlign: 'left',
                }}
                classes={{ primary: styles.mainCategoryText }}
                />
              </ListItemButton>
              </ListItem>


            <div
              style={{
                  maxHeight: hoveredCategory === property.id ? '300px' : '0px', 
                  overflow: 'hidden',
                  transition: 'max-height 0.7s ease-in-out', 
                  backgroundColor: 'transparent', 
                  zIndex: 1,
                  width: '100%',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                <List>
                  {property.subCategories.map((sub) => (
                  <ListItem key={sub.id} disablePadding>
                      <ListItemButton
                      className={styles.subCategoryButton}
                      component="a"
                      href={sub.path}
                      >
                      <ListItemText primary={sub.name}
                      primaryTypographyProps={{
                          textAlign: 'right',
                      }}
                      sx={{
                          textAlign: 'right',
                      }}
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
      <div className="flex justify-center">
        <IconButton onClick={handleLogout} className={styles.logoutButton}>
          <p className={styles.logoutText}> Logout </p>
          <LogoutIcon />
        </IconButton>

        <IconButton className={styles.logoutButton}>
          <p className={styles.logoutText}> Need Help ? </p>
        </IconButton>

      </div>
    </Box>

    )

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <IconButton
            onClick={toggleDrawer(true)}
            size="small"
            sx={{ ml: 2 }}
          >
            <Avatar
            src={user?.picture || undefined } 
            alt={user?.name || undefined }  
            sx={{ width: 38, height: 38 }}></Avatar>
          </IconButton>
      </Box>
      <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            anchor="right"
            
            sx={{
                width: 300,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 300,
                    boxSizing: 'border-box',
                    backgroundColor: '#f1f3f8',
                },
            }}
        >
            {DrawerList}
        </Drawer>

    </React.Fragment>
  );
}
