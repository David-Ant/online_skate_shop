"use client";

import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import AddToCartButton from "~/app/_components/AddToCartButton";
import Image from "next/image";

export default function ItemPage() {

  const { id } = useParams();
  const verifiedId = Array.isArray(id) ? id[0] : id ?? "";

  const { data: item, isLoading, error } = api.stock.getItemById.useQuery({
    id: verifiedId || "",
  })
  if (isLoading) return <div>Loading...</div>
  if (error) {
    console.error("Search error:", error);
    return <div>Error: {error.message}</div>;
  }
  if (item) {
    return (
      <main>
        <div className="max-w-[800px] mx-auto my-8 p-6 font-sans bg-gray-100 rounded-lg shadow-lg">
          {/* Title */}
          <h1 className="text-center font-bold">{item.name}</h1>

          {/* Image */}
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={400}
            height={400}
            className="block mx-auto rounded-lg max-w-full h-auto shadow-lg"
          />

          {/* Basic Info */}
          <p className="text-base text-gray-600 my-2">
            <strong className="text-gray-900">Type:</strong> {item.type}
          </p>
          <p className="text-base text-gray-600 my-2">
            <strong className="text-gray-900">Brand:</strong> {item.brand}
          </p>
          <p className="text-base text-gray-600 my-2">
            <strong className="text-gray-900">Cost:</strong> {item.cost.toFixed(2)}€
          </p>

          {/* Specifications */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Specifications</h3>
            {item.width && (
              <p className="text-base text-gray-600 my-2">
                <strong className="text-gray-900">Width:</strong> {item.width} inches
              </p>
            )}
            {item.length && (
              <p className="text-base text-gray-600 my-2">
                <strong className="text-gray-900">Length:</strong> {item.length} inches
              </p>
            )}
            {item.axelDistance && (
              <p className="text-base text-gray-600 my-2">
                <strong className="text-gray-900">Axel Distance:</strong> {item.axelDistance} inches
              </p>
            )}
            {item.diameter && (
              <p className="text-base text-gray-600 my-2">
                <strong className="text-gray-900">Diameter:</strong> {item.diameter} mm
              </p>
            )}
            {item.durometer && (
              <p className="text-base text-gray-600 my-2">
                <strong className="text-gray-900">Durometer:</strong> {item.durometer}
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <div className="mt-8 text-center">
            <AddToCartButton itemId={item.id} />
          </div>
        </div>
      </main>

    )
  }
}