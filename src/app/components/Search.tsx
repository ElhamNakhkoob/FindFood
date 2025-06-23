"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set("title", searchTerm);
    currentSearchParams.set("page", "1");
    router.push(`/store?${currentSearchParams.toString()}`);
  };

  return (
    <div className="flex max-w-md mx-auto mb-8 mt-10">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow border border-[#DE8436] rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#DE8436]"
      />
      <button
        onClick={handleSearch}
        className="bg-[#DE8436] hover:bg-[#D9AC84] text-white font-semibold px-5 rounded-r-md transition-colors duration-300"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
