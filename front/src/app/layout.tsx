import NavBar from "@/components/NavBar";
import "./globals.css";
import Footer from "@/components/Footer";
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The Scented Shop</title>
        <link rel="icon" href="Favicon.ico" />
      </head>
      <UserProvider>
          <body>
              <NavBar />
              <main>{children}</main>
              <Footer />
          </body>
      </UserProvider>

    </html>
  );
}

