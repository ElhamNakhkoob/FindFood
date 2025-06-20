"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Container from "@/app/components/Container";
import axios from "axios";

function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

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

  const handleCreateProduct = () => {
    axios.post("http://localhost:3004/products", {
      id: Math.floor(Math.random() * 10000).toString(),
      image: newProduct.image,
      title: newProduct.title,
      description: newProduct.description,
      price: newProduct.price,
    });
  };

  return (
    <div className="bg-slate-300 p-4">
      <Container>
        {/* Product Creator UI */}
        <div className="grid grid-cols-3 gap-4">
          <input
            name="title"
            onChange={handleChangeProduct}
            type="text"
            placeholder="title"
          />
          <input
            name="price"
            onChange={handleChangeProduct}
            type="text"
            placeholder="price"
          />
          <input
            name="image"
            onChange={handleChangeProduct}
            type="text"
            placeholder="image"
          />
        </div>
        <textarea
          name="description"
          onChange={handleChangeProduct}
          placeholder="description"
          className="w-full mt-4"
        ></textarea>
        <button
          onClick={handleCreateProduct}
          className="bg-sky-500 text-white rounded px-4 py-1 mt-2"
        >
          Create new product
        </button>

        {/* Orders List */}
        <div className="mt-10 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Orders</h2>
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="border-b py-2">
                <p>
                  <strong>User:</strong> {order.userName}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Items:</strong>
                </p>
                <ul className="ml-4 list-disc">
                  {order.cartItems.map((item: any) => (
                    <li key={item.id}>
                      ID: {item.id} - Qty: {item.qty}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
