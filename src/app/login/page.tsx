"use client";
import React, { useState } from "react";
import Container from "@/app/components/Container";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios({
        url: "",
        method: "POST",
        data: {
          username: userName,
          password: password,
        },
      });
      const authData = {
        token: "1234567890",
        expire: 7,
      };
      Cookie.set("token", authData.token, {
        expires: authData.expire,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Container>
        <div className="border border-[#D8732F] rounded-lg p-6 flex flex-col w-80 mx-auto bg-white shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-[#D8732F] text-center">
            Login
          </h2>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
            className="mb-4 px-4 py-2 rounded border border-[#DE8436] text-[#D8732F] placeholder-[#DE8436] focus:outline-none focus:ring-2 focus:ring-[#D8732F]"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="mb-6 px-4 py-2 rounded border border-[#DE8436] text-[#D8732F] placeholder-[#DE8436] focus:outline-none focus:ring-2 focus:ring-[#D8732F]"
          />
          <button
            onClick={handleLogin}
            className="bg-[#D8732F] hover:bg-[#DE8436] text-white font-semibold py-2 rounded transition-colors duration-300"
          >
            Login
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Login;
