import LandingPage from "@/components/LandingPage";
import styles from "./index.module.css";
import { Box } from "@mui/material";
import AnimatedPage from "@/components/AnimatedPage";

export default function Home() {
  return (
    <>
      <AnimatedPage>
        <Box component="header" className={styles.container}>
          <img src="/images/Untitled.png" alt="background" className={styles.background} />
        </Box>
      </AnimatedPage>


      <LandingPage />
    </>
  );
}
