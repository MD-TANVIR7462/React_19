/* eslint-disable react-refresh/only-export-components */
// example of context
import React, { createContext, useState } from "react";
export const CartContext = createContext(undefined);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const values = {
    cart,
    setCart,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartProvider;
