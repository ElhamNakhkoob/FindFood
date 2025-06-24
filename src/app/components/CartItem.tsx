import axios from "axios";
import { useEffect, useState } from "react";
import { IProductItemProps } from "./ProductItem";
import AddToCart from "./AddToCart";

interface CartItemProps {
  id: number;
  qty: number;
}

function CartItem({ id, qty }: CartItemProps) {
  const [data, setData] = useState({} as IProductItemProps);

  useEffect(() => {
    axios(`http://localhost:3004/products/${id}`).then((response) => {
      const { data } = response;
      setData(data);
    });
  }, [id]);
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md p-4 gap-4">
      <img
        src={data.image}
        alt={data.title}
        className="w-24 h-24 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-1">{data.title}</h2>
        <p className="text-gray-600">
          Quantity: <span className="font-medium">{qty}</span>
        </p>
        <p className="text-gray-700 mt-1">
          Price:{" "}
          <span className="font-semibold text-blue-600">${data.price}</span>
        </p>
      </div>
      <div className="flex-shrink-0">
        <AddToCart id={id.toString()} />
      </div>
    </div>
  );
}

export default CartItem;
