import NavBar from "@/components/NavBar";
import "../app/globals.css";
import Footer from "@/components/Footer";
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { CartProvider } from "context/CartContext";

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
        <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
          <CartProvider>
            <NavBar />
              <main className="flex-grow">
                {children}
              </main>
          </CartProvider>
          <Footer />
        </body>
      </UserProvider>

    </html>
  );
}

