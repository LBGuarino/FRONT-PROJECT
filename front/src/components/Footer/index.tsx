import { Box } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      className="bg-footerBg text-footerText font-light py-8 px-4"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <Link href="/about-us" className="hover:text-black hover:underline">
            Terms of Service
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-footerHover hover:underline"
          >
            Privacy Policy
          </Link>
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            FAQ
          </Link>
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            Returns
          </Link>
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            Shipping
          </Link>
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            Security
          </Link>
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            Refund Policy
          </Link>
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            Sitemap
          </Link>
          <Link href="/about-us" className="hover:text-footerHover hover:underline">
            About Us
          </Link>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            Facebook
          </Link>
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            Instagram
          </Link>
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            X
          </Link>
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            YouTube
          </Link>
          <Link href="/contact-us" className="hover:text-footerHover hover:underline">
            Pinterest
          </Link>
        </div>
      </div>
    </Box>
  );
}
