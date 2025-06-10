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
      <div className="max-w-4xl mx-auto mt-8 shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="md:col-span-2 p-6">
            <h2 className="font-bold text-2xl mb-2">{data.title}</h2>
            <p className="text-gray-700 mb-4">{data.description}</p>
            <p className="text-lg font-semibold mb-4">
              Price: <span className="text-[#DE8436]">${data.price}</span>
            </p>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-[#D9AC84] text-white rounded hover:bg-[#DE8436] transition">
                +
              </button>
              <span className="text-lg font-medium">3</span>
              <button className="px-4 py-2 bg-[#D9AC84] text-white rounded hover:bg-[#DE8436] transition">
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
