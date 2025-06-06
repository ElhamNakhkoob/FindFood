import React from "react";
import Container from "../../components/Container";
import { IProductItemProps } from "../../components/ProductItem";

interface IProductProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{}>;
}

async function Product({ params }: IProductProps) {
  const { id } = await params;
  const result = await fetch(`http://localhost:3004/products/${id}`);
  const data = (await result.json()) as IProductItemProps;

  return (
    <Container>
      <div className="grid grid-cols-12 mt-8 shadow-md">
        <div className="col-span-3">
          <img src={data.image} alt="ttt" />
        </div>
        <div className="col-span-9 p-4">
          <h2 className="font-bold text-xl">{data.title}</h2>
          <p>{data.description}</p>
          <p>
            price: <span>{data.price}</span>
          </p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-sky-300 text-white rounded">
              +
            </button>
            <span className="mx-4">3</span>
            <button className="px-4 py-2 bg-sky-300 text-white rounded">
              -
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
