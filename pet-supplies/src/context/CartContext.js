import React, { createContext, useState, useEffect } from 'react';

// The CartContext provides a simple interface for adding and removing
// items from the shopping cart. It persists cart contents in
// localStorage so that refreshing the page does not clear the cart.
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.warn('Failed to parse cart from localStorage', err);
      return [];
    }
  });

  // Persist the cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (err) {
      console.warn('Failed to save cart to localStorage', err);
    }
  }, [cartItems]);

  /**
   * Add an item to the cart. If the item already exists
   * (matching id), increment its quantity. Otherwise
   * append a new entry.
   */
  function addToCart(item) {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  /**
   * Remove a single quantity of the specified item. If the
   * quantity reaches zero the item is removed completely.
   */
  function removeFromCart(itemId) {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === itemId);
      if (!existing) return prev;
      if (existing.quantity > 1) {
        return prev.map((ci) =>
          ci.id === itemId ? { ...ci, quantity: ci.quantity - 1 } : ci
        );
      }
      return prev.filter((ci) => ci.id !== itemId);
    });
  }

  /**
   * Completely remove an item regardless of its quantity.
   */
  function removeItemCompletely(itemId) {
    setCartItems((prev) => prev.filter((ci) => ci.id !== itemId));
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, removeItemCompletely }}
    >
      {children}
    </CartContext.Provider>
  );
}