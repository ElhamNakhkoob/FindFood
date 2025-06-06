// components/Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ILayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
