"use client";

import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import Link from "next/link";

export default function CategoryPage() {

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data: filteredStock, isLoading, error } = api.stock.filterStock.useQuery({
    query,
  });

  if (isLoading) return <div>Loading...</div>
  if (error) {
    console.error("Search error:", error);
    return <div>Error: {error.message}</div>;
  }
  if (filteredStock)
    return (
      <main>
        <div className="flex flex-wrap gap-6">
          {filteredStock.map((image) => (
            <Link href={`/item/${image.id}`} key={image.id}>
              <div key={image.id} className="flex w-48 flex-col">
                <img src={image.imageUrl} />
                <div className="bg-gradient-to-b from-white to-transparent p-3">
                  <div className="text-sm">{image.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
}