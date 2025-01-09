"use client";

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
import styles from './index.module.css';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

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
    <Box
      sx={{
        width: { xs: '80vw', sm: 400 },
        marginTop: { xs: '5em', sm: '8em' },
      }}
      role="presentation"
    >
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/images/logo.svg"
            className={styles.logo}
            width={220}
            height={30}
            alt="Brand Logo"
          />
        </Link>
      </div>
      <List>
        {mainCategories.map((category) => (
          <div
            key={category.id}
            onMouseEnter={() => handleMouseEnter(category.id)}
            onMouseLeave={handleMouseLeave}
            className={styles.categoryContainer}
          >
            <ListItem sx={{
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: '#d8c8bb', 
              }}} className={styles.listItem}>
              <ListItemButton
                component={Link}
                href={category.path}
              >
                <ListItemText
                  primary={<span className={styles.mainCategoryText}>{category.name}</span>}
                />
              </ListItemButton>
            </ListItem>
            <div
              className={classNames(styles.subCategoryContainer, {
                [styles.subCategoryContainerActive]: hoveredCategory === category.id,
              })}
            >
              <List>
                {category.subCategories.map((sub) => (
                  <ListItem key={`${category.id}-${sub.id}`} disablePadding>
                    <ListItemButton
                      className={styles.subCategoryButton}
                      component={Link}
                      href={`${category.path}/${sub.name.toLowerCase().replace(/ /g, '-')}`}
                    >
                      <ListItemText
                        primary={<span className={styles.subCategoryText}>{sub.name}</span>}
                        primaryTypographyProps={{ fontFamily: 'inherit', fontSize:"16px", fontWeight:"200" }}
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
    </Box>
  );

  return (
    <div className={styles.drawerContainer}>
      <Button className={styles.menuButton} onClick={toggleDrawer(true)}>
        <Image src="/icons/menuicon.svg" width={30} height={21} alt="Menu Icon" />
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
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
