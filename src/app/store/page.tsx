import React from "react";
import Container from "../components/Container";
import ProductItem from "../components/ProductItem";
import Link from "next/link";
import { IProductItemProps } from "../components/ProductItem";

async function Store() {
  const result = await fetch("http://localhost:3004/products");
  const data = (await result.json()) as IProductItemProps[];

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <Link href={`/store/${item.id}`} key={item.id}>
            <ProductItem {...item} />
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default Store;
