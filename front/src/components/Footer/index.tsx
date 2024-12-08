import { Box } from "@mui/material"
import styles from "./index.module.css"
import Link from "next/link";

export default function Footer() {
  return (
    <div>

      <Box component="footer" className={styles.footer}>

        <div className={styles.footerLinks}>
          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/about-us"}>
            <p>Terms of Service</p>
          </Link>

          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/privacy-policy"}>
            <p>Privacy Policy</p>
          </Link>
 
          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>Contact Us</p>
          </Link>

        </div>

        <div className={styles.footerLinks}>
          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>FAQ</p>
          </Link>
          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>Returns</p>
          </Link>

          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>Shipping</p>
          </Link>

          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>Security</p>
          </Link>
 
          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>Refund Policy</p>
          </Link>

          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>Sitemap</p>
          </Link>

          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>About Us</p>
          </Link>

        </div>

        <div className={styles.footerLinks}>
          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>Facebook</p>
          </Link>
 
          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>Instagram</p>
          </Link>
 
          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>X</p>
          </Link>
 
          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>YouTube</p>
          </Link>

          <Link style={{textDecoration: "none", color: "#5f4b52"}} href={"/contact-us"}>
            <p>Pinterest</p>
          </Link>
 
        </div>
      </Box>

    </div>
  );
} 