"use client";
import Container from "../components/Container";
import CartItem from "../components/CartItem";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { IProductItemProps } from "../components/ProductItem";
import { formatNumerWithCommas } from "../../utils/number";

interface IDiscount {
  id: number;
  code: string;
  percentage: number;
}

function Cart() {
  const { cartItems } = useShoppingCartContext();
  const [data, setData] = useState<IProductItemProps[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    axios(`http://localhost:3004/products`).then((response) => {
      const { data } = response;
      setData(data);
    });
  }, []);

  let totalPrice = cartItems.reduce((total, item) => {
    let selectedProduct = data.find(
      (product) => product.id == item.id.toString()
    );
    return total + (selectedProduct?.price || 0) * item.qty;
  }, 0);

  const handleSubmitDiscount = () => {
    axios(`http://localhost:3004/discount?code=${discountCode}`).then(
      (result) => {
        const data = result.data as IDiscount[];
        let discountedPrice = (totalPrice * data[0]?.percentage) / 100;
        let finalPrice = totalPrice - discountedPrice;
        setFinalPrice(finalPrice);
        setDiscountedPrice(discountedPrice);
      }
    );
  };

  return (
    <Container>
      <h1>Cart</h1>
      <div className="">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className="border shadow-md">
        <h3>
          Price: <span>{formatNumerWithCommas(totalPrice)}$</span>
        </h3>
        <h3>
          takhfif <span>{formatNumerWithCommas(discountedPrice)}</span>
        </h3>
        <h3>
          Total Price: <span>{formatNumerWithCommas(finalPrice)}</span>
        </h3>
        <div>
          <input
            placeholder="enter discount code"
            type="text"
            onChange={(e) => setDiscountCode(e.target.value)}
            value={discountCode}
          />
          <button onClick={handleSubmitDiscount}>Code</button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
