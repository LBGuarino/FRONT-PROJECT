"use client"; // <- IMPORTANTE para indicar que este archivo se ejecuta en el cliente

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

//
// 1. Declaramos los tipos:
//
export interface ProductId {
  id: number;
  quantity: number;
}

const validateProductId = (productId: number): boolean => {
  return Number.isInteger(productId) && productId >= 0 && productId <= 999;
};

//
// 2. Definimos la interfaz para el contexto
//
interface CartContextValue {
  productsInBag: ProductId[];
  addToCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

//
// 3. Creamos el contexto
//
const CartContext = createContext<CartContextValue | null>(null);

//
// 4. Definimos el provider que va a envolver nuestra aplicación
//
export function CartProvider({ children }: { children: ReactNode }) {
  const [productsInBag, setProductsInBag] = useState<ProductId[]>([]);

  // Cargar el carrito desde el localStorage al montar el componente
  useEffect(() => {
    const savedCart = typeof window !== "undefined"
      ? localStorage.getItem("productsInBag")
      : null;

    if (savedCart) {
      setProductsInBag(JSON.parse(savedCart));
    }
  }, []);

  // Guardar el carrito en localStorage cada vez que se actualice el estado
  const syncLocalStorage = (cart: ProductId[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("productsInBag", JSON.stringify(cart));
    }
  };

  const { user } = useUser();

  const addToCart = (productId: number, quantity: number) => {
    if (!user) window.location.href = '/api/auth/login';
    console.log(">>> addToCart llamado con:", productId, quantity);
    if (!validateProductId(productId)) {
      alert(`Invalid product id: ${productId}`);
      return;
    }

    setProductsInBag((prev) => {
      const updatedCart = [...prev];
      const existingProductIndex = updatedCart.findIndex(
        (p) => p.id === productId
      );

      if (existingProductIndex >= 0) {
        updatedCart[existingProductIndex].quantity += quantity;
      } else {
        updatedCart.push({ id: productId, quantity });
      }

      console.log(">>> Carrito actualizado:", updatedCart);
      syncLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: number) => {
    if (!validateProductId(productId)) {
      alert(`Invalid product id: ${productId}`);
      return;
    }

    setProductsInBag((prev) => {
      const updatedCart = prev.filter((p) => p.id !== productId);
      syncLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (!validateProductId(productId)) {
      alert(`Invalid product id: ${productId}`);
      return;
    }

    setProductsInBag((prev) => {
      const updatedCart = prev.map((p) =>
        p.id === productId ? { ...p, quantity } : p
      );
      syncLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setProductsInBag([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("productsInBag");
    }
  };

  return (
    <CartContext.Provider
      value={{
        productsInBag,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

//
// 5. Creamos un custom hook para consumir nuestro contexto
//
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de <CartProvider>");
  }
  return context;
}
