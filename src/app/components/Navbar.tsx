"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "./Container";

function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", title: "Home" },
    { href: "/store", title: "Store" },
  ];

  return (
    <nav className="shadow p-4 bg-[#D9AC84]">
      <Container>
        <div className="flex items-center justify-between">
          <div className="w-1/3 flex items-center">
            <Image
              src="/FindFood/dish.png"
              alt="findFood Logo"
              width={40}
              height={40}
              className="rounded-full invert brightness-0"
            />
          </div>
          <div className="text-center w-1/3">
            <span className="text-2xl font-bold tracking-wide text-white font-serif">
              findFood
            </span>
          </div>
          <div className="flex justify-end w-1/3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mx-2 font-semibold transition-colors ${
                  pathname === item.href ? "text-[#DE8436]" : "text-white"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
