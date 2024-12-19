import { useState } from 'react';
import { IProduct } from '@/interfaces/IProduct';

export const useCart = () => {
  const [productsInBag, setProductsInBag] = useState<IProductWithQuantity[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('productsInBag');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const addToCart = (product: IProduct) => {
    setProductsInBag((prev) => {
      const existingProduct = prev.find((p) => p.id === product.id);

      if (existingProduct && existingProduct.quantity >= product.stock) {
        alert('No hay suficiente stock disponible');
        return prev;
      }

      const updatedCart = prev.find((p) => p.id === product.id)
        ? prev.map((p) =>
            p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
          )
        : [...prev, { ...product, quantity: 1 }]; // Añade quantity al producto
      localStorage.setItem('productsInBag', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setProductsInBag((prev) => {
      const updatedCart = prev.filter((p) => p.id !== productId);
      localStorage.setItem('productsInBag', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setProductsInBag((prev) => {
      const updatedCart = prev.map((p) =>
        p.id === productId ? { ...p, quantity } : p
      );
      localStorage.setItem('productsInBag', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return { productsInBag, addToCart, removeFromCart, updateQuantity };
};

interface IProductWithQuantity extends IProduct {
  quantity: number;
}
