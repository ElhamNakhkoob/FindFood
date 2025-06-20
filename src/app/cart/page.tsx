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
  const [newOrder, setNewOrder] = useState({
    cartItems: [],
    address: "",
    userName: "",
    status: "pending | completed",
  });

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

  const handleOrderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewOrder({
      ...newOrder,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrders = () => {
    const order = {
      cartItems,
      address: newOrder.address,
      userName: newOrder.userName,
      status: newOrder.status,
    };

    axios
      .post("http://localhost:3004/orders", order)
      .then(() => {
        alert("Order placed successfully!");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      });
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <div className="border shadow-md p-4 mt-6 space-y-4">
        <div>
          <h3>
            Price:{" "}
            <span className="font-semibold">
              {formatNumerWithCommas(totalPrice)}$
            </span>
          </h3>
          <h3>
            Discount:{" "}
            <span className="text-green-600">
              {formatNumerWithCommas(discountedPrice)}$
            </span>
          </h3>
          <h3>
            Total Price:{" "}
            <span className="font-bold text-lg text-blue-600">
              {formatNumerWithCommas(finalPrice || totalPrice)}$
            </span>
          </h3>
        </div>

        <div className="flex gap-2">
          <input
            className="border px-2 py-1"
            placeholder="Enter discount code"
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button
            onClick={handleSubmitDiscount}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Apply Code
          </button>
        </div>

        <div className="pt-4 space-y-2">
          <input
            name="userName"
            placeholder="Your Name"
            value={newOrder.userName}
            onChange={handleOrderChange}
            className="border w-full p-2"
          />
          <input
            name="address"
            placeholder="Your Address"
            value={newOrder.address}
            onChange={handleOrderChange}
            className="border w-full p-2"
          />
        </div>

        <button
          onClick={handleSubmitOrders}
          className="bg-[#DE8436] text-white px-6 py-2 rounded mt-2"
        >
          Submit Order
        </button>
      </div>
    </Container>
  );
}

export default Cart;
