"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

export interface ProductId {
  id: number;
  quantity: number;
}

const validateProductId = (productId: number): boolean => {
  return Number.isInteger(productId) && productId >= 0 && productId <= 999;
};

interface CartContextValue {
  productsInBag: ProductId[];
  addToCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [productsInBag, setProductsInBag] = useState<ProductId[]>([]);

  useEffect(() => {
    const savedCart = typeof window !== "undefined"
      ? localStorage.getItem("productsInBag")
      : null;

    if (savedCart) {
      setProductsInBag(JSON.parse(savedCart));
    }
  }, []);

  const syncLocalStorage = (cart: ProductId[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("productsInBag", JSON.stringify(cart));
    }
  };

  const { user } = useUser();

  const addToCart = (productId: number, quantity: number) => {
    if (!user) {
      window.location.href = '/api/auth/login'
    } else {
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

      syncLocalStorage(updatedCart);
      return updatedCart;
    });
  }};

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

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside <CartProvider>");
  }
  return context;
}
