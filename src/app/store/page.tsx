import React from "react";
import Container from "../components/Container";
import ProductItem from "../components/ProductItem";
import Link from "next/link";
import { IProductList } from "../components/ProductItem";
import Pagination from "../components/pagination";
import Search from "../components/Search";

interface IStoreProps {
  params: Promise<Record<string, never>>;
  searchParams: Promise<{ page: string; per_page: string; title: string }>;
}

async function Store({ searchParams }: IStoreProps) {
  const page = (await searchParams).page ?? "1";
  const perPage = (await searchParams).per_page || "8";
  const title = (await searchParams).title ?? "";

  const result = await fetch(
    `http://localhost:3004/products?_page=${page}&_per_page=${perPage}&title=${title}`
  );
  const data = (await result.json()) as IProductList;

  return (
    <Container>
      <Search />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data?.map((item) => (
          <Link href={`/store/${item.id}`} key={item.id}>
            <ProductItem {...item} />
          </Link>
        ))}
      </div>
      <Pagination pageCount={data.pages} />
    </Container>
  );
}

export default Store;
