import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem) => {
    const index = cartItems.findIndex(
      (item) => item.id === newItem.id && item.color === newItem.color
    );

    if (index !== -1) {
      const updated = [...cartItems];
      updated[index].quantity += newItem.quantity;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = (id, color) => {
    setCartItems(
      cartItems.filter((item) => !(item.id === id && item.color === color))
    );
  };

  const updateQuantity = (id, color, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.color === color ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem("cart");
};


  
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
