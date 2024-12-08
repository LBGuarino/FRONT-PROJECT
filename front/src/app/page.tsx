"use client";
import LandingPage from "@/components/LandingPage";
import styles from "./index.module.css";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box component="header" className={styles.container}>
        <img src="/images/background.png" alt="background" className={styles.background} />
      </Box>

      <LandingPage />
    </>
  );
}
