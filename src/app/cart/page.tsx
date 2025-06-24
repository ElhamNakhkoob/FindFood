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
  const { cartItems, clearCart } = useShoppingCartContext();
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

  const totalPrice = cartItems.reduce((total, item) => {
    const selectedProduct = data.find(
      (product) => product.id == item.id.toString()
    );
    return total + (selectedProduct?.price || 0) * item.qty;
  }, 0);

  const handleSubmitDiscount = () => {
    axios(`http://localhost:3004/discount?code=${discountCode}`).then(
      (result) => {
        const data = result.data as IDiscount[];
        const discountedPrice = (totalPrice * data[0]?.percentage) / 100;
        const finalPrice = totalPrice - discountedPrice;
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
        clearCart();
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      });
  };

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white p-4 rounded shadow max-h-[70vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-[400px] bg-white p-6 rounded shadow flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="mb-4 space-y-2">
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-semibold">
                  {formatNumerWithCommas(totalPrice)}$
                </span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-{formatNumerWithCommas(discountedPrice)}$</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-blue-600 border-t pt-2">
                <span>Total Price:</span>
                <span>{formatNumerWithCommas(finalPrice || totalPrice)}$</span>
              </div>
            </div>
            <div className="flex gap-2 mb-6">
              <input
                className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter discount code"
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button
                onClick={handleSubmitDiscount}
                className="bg-green-600 hover:bg-green-700 text-white px-4 rounded transition"
              >
                Apply
              </button>
            </div>
            <div className="space-y-4">
              <input
                name="userName"
                placeholder="Your Name"
                value={newOrder.userName}
                onChange={handleOrderChange}
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="address"
                placeholder="Your Address"
                value={newOrder.address}
                onChange={handleOrderChange}
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleSubmitOrders}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold transition"
          >
            Submit Order
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
