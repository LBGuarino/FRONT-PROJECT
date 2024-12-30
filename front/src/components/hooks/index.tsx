import { useState, useEffect } from 'react';

export interface ProductId {
  id: number;
  quantity: number;
}

const validateProductId = (productId: number): boolean => {
  return Number.isInteger(productId) && productId >= 0 && productId <= 999;
};

export const useCart = () => {
  const [productsInBag, setProductsInBag] = useState<ProductId[]>([]);

  // Cargar el carrito desde el localStorage al montar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('productsInBag');
      if (savedCart) {
        setProductsInBag(JSON.parse(savedCart));
      }
    }
  }, []);

  // Guardar el carrito en localStorage cada vez que se actualice el estado
  const syncLocalStorage = (cart: ProductId[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('productsInBag', JSON.stringify(cart));
    }
  };

  const addToCart = (productId: number, quantity: number) => {
    if (!validateProductId(productId)) {
      alert(`Invalid product id: ${productId}`);
      return;
    }

    setProductsInBag((prev) => {
      const updatedCart = [...prev];
      const existingProductIndex = updatedCart.findIndex((p) => p.id === productId);

      if (existingProductIndex >= 0) {
        updatedCart[existingProductIndex].quantity += quantity;
      } else {
        updatedCart.push({ id: productId, quantity });
      }

      syncLocalStorage(updatedCart); // Sincroniza el localStorage inmediatamente
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
      syncLocalStorage(updatedCart); // Sincroniza el localStorage inmediatamente
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
      syncLocalStorage(updatedCart); // Sincroniza el localStorage inmediatamente
      return updatedCart;
    });
  };

  const clearCart = () => {
    setProductsInBag([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('productsInBag');
    }
  };

  return { productsInBag, addToCart, removeFromCart, updateQuantity, clearCart };
};
