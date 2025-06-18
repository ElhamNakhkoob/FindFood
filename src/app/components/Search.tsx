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
    router.push(`/store?${currentSearchParams.toString()}`);
  };

  return (
    <div className="search-container">
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
}

export default Search;
