import LandingPage from "@/components/LandingPage";
import { Box } from "@mui/material";
import AnimatedPage from "@/components/AnimatedPage";

export default function Home() {
  return (
    <>
      <AnimatedPage>
        <Box component="header" className="flex flex-col items-center justify-center w-full">
          <img src="/images/Untitled.png" alt="background" className="w-full h-auto object-cover" />
        </Box>
      </AnimatedPage>


      <LandingPage />
    </>
  );
}
