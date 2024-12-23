import { useState, useEffect } from 'react';

export interface ProductId {
  id: number;
  quantity: number;
}

const validateProductId = (productId: number): boolean => {
  return Number.isInteger(productId) && productId >= 0 && productId <= 999;
};

export const useCart = () => {
  const [productsInBag, setProductsInBag] = useState<ProductId[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('productsInBag');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('productsInBag', JSON.stringify(productsInBag));
    }
  }, [productsInBag]);

  const addToCart = (productId: number, quantity: number) => {
    if (!validateProductId(productId)) {
      alert(`Invalid product id: ${productId}`);
      return;
    }

    setProductsInBag((prev) => {
      const existingProduct = prev.find((p) => p.id === productId);

      if (existingProduct) {
        return prev.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + quantity } : p
        );
      } else {
        return [...prev, { id: productId, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    if (!validateProductId(productId)) {
      alert(`Invalid product id: ${productId}`);
      return;
    }

    setProductsInBag((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (!validateProductId(productId)) {
      alert(`Invalid product id: ${productId}`);
      return;
    }

    setProductsInBag((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity } : p))
    );
  };

  const clearCart = () => {
    setProductsInBag([]);
    localStorage.removeItem('productsInBag');
  };

  return { productsInBag, addToCart, removeFromCart, updateQuantity, clearCart };
};
