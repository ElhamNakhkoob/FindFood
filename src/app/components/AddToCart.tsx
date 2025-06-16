"use client";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";

interface AddToCartProps {
  id: string;
}

function AddToCart({ id }: AddToCartProps) {
  const {
    cartItems,
    handleIncreaseProductQty,
    getProductQty,
    handleDecreaseProductQty,
    handleRemoveProduct,
  } = useShoppingCartContext();

  console.log("cartItems", cartItems);

  return (
    <div>
      <div className="flex items-center space-x-4">
        <button
          className="px-4 py-2 bg-[#D9AC84] text-white rounded hover:bg-[#DE8436] transition"
          onClick={() => handleIncreaseProductQty(parseInt(id))}
        >
          +
        </button>
        <span className="text-lg font-medium">
          {getProductQty(parseInt(id))}
        </span>
        <button
          onClick={() => handleDecreaseProductQty(parseInt(id))}
          className="px-4 py-2 bg-[#D9AC84] text-white rounded hover:bg-[#DE8436] transition"
        >
          -
        </button>
      </div>
      <button
        onClick={() => handleRemoveProduct(parseInt(id))}
        className="px-4 py-2 bg-[#D9AC84] text-white rounded hover:bg-[#DE8436] mt-2 transition"
      >
        remove from cart
      </button>
    </div>
  );
}

export default AddToCart;
