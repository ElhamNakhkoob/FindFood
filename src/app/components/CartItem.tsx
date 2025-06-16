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
  }, []);

  return (
    <div className="grid grid-cols-10 bg-slate-100 mb-4">
      <img className="col-span-2" src={data.image} alt="" />
      <div>
        <h2>{data.title}</h2>
        <p>
          number of Products: <span>{qty}</span>
        </p>
        <p>
          Price: <span>{data.price}</span>
        </p>
        <AddToCart id={id.toString()} />
      </div>
    </div>
  );
}

export default CartItem;
