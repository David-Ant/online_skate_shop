"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiSearch } from "react-icons/hi";

export function SearchWithButton() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/shopping/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
      <div className="flex items-right justify-center p-[5px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="p-[10px] border-2 border-[#ccc] rounded outline-none text-base w-[200px] h-[40px]"
        />
        <button
          onClick={handleSearch}
          className="ml-[10px] p-[10px] bg-[#FFA500] text-white border-none rounded cursor-pointer h-[40px] hover:bg-[#C78100]"
        >
          <HiSearch size={20} />
        </button>
      </div>
  );
}
