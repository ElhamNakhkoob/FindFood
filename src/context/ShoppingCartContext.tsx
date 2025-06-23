"use client";
import { createContext, useEffect, useState, useContext } from "react";

type ShoppingCartContextProps = {
  children: React.ReactNode;
};

type CartItems = {
  id: number;
  qty: number;
};

type ShoppingCartContextType = {
  cartItems: CartItems[];
  handleIncreaseProductQty: (id: number) => void;
  getProductQty: (id: number) => number;
  cartTotalQty: number;
  handleDecreaseProductQty: (id: number) => void;
  handleRemoveProduct: (id: number) => void;
  clearCart: () => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProps) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const cartTotalQty = cartItems.reduce(
    (totalQty, item) => totalQty + item.qty,
    0
  );

  const getProductQty = (id: number) => {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  };

  const handleIncreaseProductQty = (id: number) => {
    setCartItems((currentItems) => {
      const productExists = currentItems.find((item) => item.id === id);
      if (!productExists) {
        return [...currentItems, { id, qty: 1 }];
      } else {
        return currentItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }
    });
  };

  const handleDecreaseProductQty = (id: number) => {
    setCartItems((currentItems) => {
      const product = currentItems.find((item) => item.id === id);
      if (product?.qty === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        );
      }
    });
  };

  const handleRemoveProduct = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        handleIncreaseProductQty,
        getProductQty,
        cartTotalQty,
        handleDecreaseProductQty,
        handleRemoveProduct,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
