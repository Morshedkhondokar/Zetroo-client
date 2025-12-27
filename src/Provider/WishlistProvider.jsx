import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  //  Load from localStorage directly
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  // Save only when wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add item
  const addToWishlist = (product) => {
    const exists = wishlist.some(
      (item) => item.id === product.id && item.color === product.color
    );

    if (!exists) {
      setWishlist([...wishlist, product]);
    }
  };

  // Remove item
  const removeFromWishlist = (id, color) => {
    const updated = wishlist.filter(
      (item) => !(item.id === id && item.color === color)
    );
    setWishlist(updated);
  };

  // Check if exists
  const isInWishlist = (id, color) => {
    return wishlist.some(
      (item) => item.id === id && item.color === color
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
