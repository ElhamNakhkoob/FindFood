"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "./Container";

function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", title: "Home" },
    { href: "/store", title: "Store" },
    { href: "/cart", title: "Cart" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow p-4 bg-[#D9AC84]">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/dish.png"
              alt="findFood Logo"
              width={40}
              height={40}
              className="rounded-full invert brightness-0"
            />
            <span className="text-2xl font-bold tracking-wide text-white font-serif">
              findFood
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-semibold transition-colors ${
                  pathname === item.href ? "text-[#DE8436]" : "text-white"
                } hover:text-[#DE8436]`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav Links */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded font-semibold transition-colors ${
                  pathname === item.href ? "text-[#DE8436]" : "text-white"
                } hover:bg-white hover:text-[#D9AC84]`}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </nav>
  );
}

export default Navbar;
