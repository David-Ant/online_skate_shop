"use client";

import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StockGrid from "./StockGrid";
import type { stockItem } from "~/types/stock";

export default function SearchResults() {

  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const router = useRouter();

  const handleOnClick = (image: stockItem) => {
    router.push(`/item/${image.id}`);
  };

  const { data: filteredStock, isLoading, error } = api.stock.filterStock.useQuery({
    query,
  });

  if (isLoading) return <div>Loading...</div>
  if (error) {
    console.error("Search error:", error);
    return <div>Error: {error.message}</div>;
  }
  if (filteredStock)
    return (/*
      <main>
        <div className="flex flex-wrap pl-[5%] pr-[5%] md:pl-[20%] md:pr-[20%]">
          {filteredStock.map((image) => (
            <Link href={`/item/${image.id}`} key={image.id}>
              <div key={image.id} className="flex w-34 md:w-48 flex-col">
                <Image
                  src={image.imageUrl}
                  alt={image.name}
                  width={192}
                  height={192}
                />
                <div className="bg-gradient-to-b from-white to-transparent p-3">
                  <div className="text-sm">{image.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>*/
      <main>
        <div className="bg-white p-3"/>
        <StockGrid items={filteredStock} onSelect={handleOnClick}/>
        <div className="bg-white p-3"/>
      </main>
    );
}