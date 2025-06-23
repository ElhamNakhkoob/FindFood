"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({ pageCount }: { pageCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageClick = (e: { selected: number }) => {
    const page = e.selected + 1;
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set("page", page.toString());
    currentSearchParams.set("per_page", "8");
    router.push(`/store?${currentSearchParams.toString()}`);
  };

  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center items-center mt-8 gap-2 flex-wrap"
        pageClassName="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
        activeClassName="bg-[#DE8436] text-white border-[#DE8436]"
        previousClassName="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
        nextClassName="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
        breakClassName="px-3 py-1 text-gray-500"
      />
    </div>
  );
}

export default Pagination;
