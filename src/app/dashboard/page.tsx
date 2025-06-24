"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Container from "@/app/components/Container";
import axios from "axios";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
}

interface CartItem {
  id: string;
  qty: number;
}

interface Order {
  id: string;
  userName: string;
  address: string;
  status: string;
  cartItems: CartItem[];
}

function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3004/products");
    console.log("Products fetched:", res.data);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:3004/orders");
    setOrders(res.data);
  };

  const handleChangeProduct = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProduct = async () => {
    try {
      await axios.post("http://localhost:3004/products", {
        id: Math.floor(Math.random() * 10000).toString(),
        image: newProduct.image,
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
      });

      setSuccessMessage("Product created successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      setNewProduct({
        title: "",
        price: "",
        image: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleRemoveOrder = async (orderId: string) => {
    console.log("Deleting order with ID:", orderId);
    try {
      await axios.delete(`http://localhost:3004/orders/${orderId}`);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Failed to remove order:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <Container>
        <div className="max-w-4xl mx-auto bg-[#FFF8F1] border border-[#D8732F] rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-[#D8732F]">
            Create New Product
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input
              name="title"
              value={newProduct.title}
              onChange={handleChangeProduct}
              type="text"
              placeholder="Title"
              className="px-4 py-2 border border-[#DE8436] rounded text-[#D8732F] placeholder-[#DE8436] focus:outline-none focus:ring-2 focus:ring-[#DE8436]"
            />
            <input
              name="price"
              value={newProduct.price}
              onChange={handleChangeProduct}
              type="text"
              placeholder="Price"
              className="px-4 py-2 border border-[#DE8436] rounded text-[#D8732F] placeholder-[#DE8436] focus:outline-none focus:ring-2 focus:ring-[#DE8436]"
            />
            <input
              name="image"
              value={newProduct.image}
              onChange={handleChangeProduct}
              type="text"
              placeholder="Image URL"
              className="px-4 py-2 border border-[#DE8436] rounded text-[#D8732F] placeholder-[#DE8436] focus:outline-none focus:ring-2 focus:ring-[#DE8436]"
            />
          </div>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChangeProduct}
            placeholder="Description"
            className="w-full mb-4 px-4 py-3 border border-[#DE8436] rounded resize-none text-[#D8732F] placeholder-[#DE8436] focus:outline-none focus:ring-2 focus:ring-[#DE8436]"
            rows={4}
          ></textarea>
          <button
            onClick={handleCreateProduct}
            className="bg-[#D8732F] hover:bg-[#DE8436] text-white font-semibold rounded px-6 py-2 transition-colors duration-300"
          >
            Create new product
          </button>
          {successMessage && (
            <p className="mt-4 text-green-600 font-semibold">
              {successMessage}
            </p>
          )}
        </div>
        <div className="max-w-4xl mx-auto mt-12 bg-white border border-[#D8732F] rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-[#D8732F]">Orders</h2>
          {orders.length === 0 ? (
            <p className="text-[#DE8436]">No orders yet</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="border-b border-[#DE8436] py-4 last:border-b-0 flex flex-col md:flex-row md:justify-between items-start md:items-center"
              >
                <div>
                  <p>
                    <strong className="text-[#D8732F]">User:</strong>{" "}
                    {order.userName}
                  </p>
                  <p>
                    <strong className="text-[#D8732F]">Address:</strong>{" "}
                    {order.address}
                  </p>
                  <p>
                    <strong className="text-[#D8732F]">Status:</strong>{" "}
                    {order.status}
                  </p>
                  <p>
                    <strong className="text-[#D8732F]">Items:</strong>
                  </p>{" "}
                  <ul className="ml-6 list-disc text-[#D8732F]">
                    {order.cartItems.map((item: CartItem) => {
                      const product = products.find(
                        (p) => p.id.toString() === item.id.toString()
                      );
                      return (
                        <li
                          key={item.id}
                          className="flex items-center space-x-3 mt-1"
                        >
                          {product?.image && (
                            <img
                              src={product.image}
                              alt={product.title || "Product"}
                              className="w-20 h-20 object-cover rounded"
                            />
                          )}
                          <span>
                            <strong>{product?.title || "No title"}</strong> -
                            Count: {item.qty} - Price: ${product?.price}
                          </span>

                          <span className="text-sm text-gray-500 ml-2">
                            ID: {item.id}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <button
                  onClick={() => handleRemoveOrder(order.id)}
                  className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition-colors duration-300 self-start md:self-auto"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
