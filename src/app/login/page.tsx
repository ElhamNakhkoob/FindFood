"use client";
import React, { useState } from "react";
import Container from "@/app/components/Container";
import axios from "axios";
import Cookie from "js-cookie";
import { redirect } from "next/navigation";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const data = axios({
      url: "",
      method: "POST",
      data: {
        username: userName,
        password: password,
      },
    });
    const response = {
      token: "1234567890",
      expire: 7,
    };

    Cookie.set("token", response.token, {
      expires: response.expire,
    });
    redirect("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Container>
        <div className="border p-4 flex flex-col w-72 max-auto">
          <input onChange={(e) => setUserName(e.target.value)} type="text" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2"
            type="password"
          />
          <button onClick={handleLogin}>login</button>
        </div>
      </Container>
    </div>
  );
}

export default Login;
