"use client";
import { createContext } from "react";
import React, { useState } from "react";
import { useContext } from "react";

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
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProps) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const handleIncreaseProductQty = (id: number) => {
    setCartItems((currentItem) => {
      let isNotProductExist = currentItem.find((item) => item.id == id) == null;
      if (isNotProductExist) {
        return [...currentItem, { id: id, qty: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, handleIncreaseProductQty }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
