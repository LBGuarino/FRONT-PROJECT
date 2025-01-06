"use client";

import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useCartContext } from "context/CartContext";
import { dashboardProperties } from "./DashboardProperties";
import styles from "./index.module.css";
import Link from "next/link";

export default function AccountMenu() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [hoveredCategory, setHoveredCategory] = React.useState<number | null>(
    null
  );

  const { user } = useUser();
  const { clearCart } = useCartContext();

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const handleMouseEnter = (propertyId: number) => {
    setHoveredCategory(propertyId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleLogout = () => {
    window.location.replace("/api/auth/logout");
    clearCart();
  };

  const DrawerList = (
    <Box sx={{ width: 300, marginTop: "6em" }} role="presentation">
      <div className="flex justify-center">
        <img
          src={user?.picture || undefined}
          className="w-1/3 h-1/3 rounded-full -mt-12 mb-6"
          alt="profile"
        />
      </div>

      <p className={styles.text}>Welcome {user?.name} 👋</p>
      <Divider />
      <List>
        {dashboardProperties.map((property) => (
          <div
            key={property.id}
            onMouseEnter={() => handleMouseEnter(property.id)}
            onMouseLeave={handleMouseLeave}
            style={{ marginBottom: "10px", position: "relative" }}
          >
            <ListItem className={styles.mainCategory}>
              <ListItemButton className={styles.mainCategoryButton}>
                <ListItemText
                  primary={<span className={styles.mainCategoryText}>{property.name}</span>}
                  primaryTypographyProps={{ textAlign: "left" }}
                />
              </ListItemButton>
            </ListItem>

            <div
              style={{
                maxHeight: hoveredCategory === property.id ? "300px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.7s ease-in-out",
                backgroundColor: "transparent",
                zIndex: 1,
                width: "100%",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <List>
                {property.subCategories.map((sub) => (
                  <ListItem key={sub.id} disablePadding>
                    <ListItemButton
                      className={styles.subCategoryButton}
                      href={sub.path}
                      component={Link}
                    >
                      <ListItemText
                        primary={<span className={styles.subCategoryText}>{sub.name}</span>}
                        sx={{ textAlign: "right" }}
                      />
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
          <p className={styles.logoutText}>Logout</p>
          <LogoutIcon />
        </IconButton>

        <IconButton className={styles.logoutButton}>
          <p className={styles.logoutText}>Need Help?</p>
        </IconButton>
      </div>
    </Box>
  );

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton onClick={toggleDrawer(true)} size="small" sx={{ ml: 2 }}>
          <Avatar
            src={user?.picture || undefined}
            alt={user?.name || undefined}
            sx={{ width: 38, height: 38 }}
          />
        </IconButton>
      </Box>
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
            backgroundColor: "#f1f3f8",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </React.Fragment>
  );
}
