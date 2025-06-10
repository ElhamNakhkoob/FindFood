"use client";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";

interface AddToCartProps {
  id: string;
}

function AddToCart({ id }: AddToCartProps) {
  const { cartItems, handleIncreaseProductQty } = useShoppingCartContext();

  console.log("cartItems", cartItems);

  return (
    <div className="flex items-center space-x-4">
      <button
        className="px-4 py-2 bg-[#D9AC84] text-white rounded hover:bg-[#DE8436] transition"
        onClick={() => handleIncreaseProductQty(parseInt(id))}
      >
        +
      </button>
      <span className="text-lg font-medium">3</span>
      <button className="px-4 py-2 bg-[#D9AC84] text-white rounded hover:bg-[#DE8436] transition">
        -
      </button>
    </div>
  );
}

export default AddToCart;
