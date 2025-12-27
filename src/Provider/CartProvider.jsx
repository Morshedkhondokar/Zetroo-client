import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.id === newItem.id && item.color === newItem.color
    );

    if (existingIndex !== -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += newItem.quantity;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = (id, color) => {
    const updated = cartItems.filter(
      (item) => !(item.id === id && item.color === color)
    );
    setCartItems(updated);
  };

  const updateQuantity = (id, color, quantity) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.color === color ? { ...item, quantity } : item
    );
    setCartItems(updated);
  };

  // ✅ Distinct items count
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

