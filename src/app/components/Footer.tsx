"use client";
import React from "react";
import Image from "next/image";
import Container from "./Container";

function Footer() {
  return (
    <footer className="bg-[#D9AC84] text-white py-10 mt-12 shadow-inner">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact us:</h2>

            <div className="flex items-center space-x-3">
              <Image
                src="/add.png"
                alt="Location"
                width={24}
                height={24}
                className="invert brightness-0"
              />
              <span>Pitter Straße. 24, 5467876, Deutschland</span>
            </div>

            <div className="flex items-center space-x-3">
              <Image
                src="/tel.png"
                alt="Phone"
                width={24}
                height={24}
                className="invert brightness-0"
              />
              <span>+49 1234598765</span>
            </div>

            <div className="flex items-center space-x-3">
              <Image
                src="/email.png"
                alt="Email"
                width={24}
                height={24}
                className="invert brightness-0"
              />
              <span>Resturant@web.de</span>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
            <input
              type="email"
              placeholder="your Email:"
              className="w-full px-4 bg-white py-2 text-black placeholder-gray-500"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
