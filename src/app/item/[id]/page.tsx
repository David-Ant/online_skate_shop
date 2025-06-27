"use client";

import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import AddToCartButton from "~/app/_components/AddToCartButton";

export default function ItemPage() {

  const { id } = useParams();
  const verifiedId = Array.isArray(id) ? id[0] : id || "";

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
        <div className="item-page">
          {/* Title */}
          <h1 className="text-center font-bold">{item.name}</h1>

          {/* Image */}
          <img src={item.imageUrl} alt={item.name} width={400} height={400} />

          {/* Basic Info */}
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Brand:</strong> {item.brand}</p>
          <p><strong>Cost:</strong> {item.cost.toFixed(2)}€</p>

          {/* Specifications */}
          <div>
            <h3 className="font-semibold mb-4">Specifications</h3>
            {item.width && <p><strong>Width:</strong> {item.width} inches</p>}
            {item.length && <p><strong>Length:</strong> {item.length} inches</p>}
            {item.axelDistance && <p><strong>Axel Distance:</strong> {item.axelDistance} inches</p>}
            {item.diameter && <p><strong>Diameter:</strong> {item.diameter} mm</p>}
            {item.durometer && <p><strong>Durometer:</strong> {item.durometer}</p>}
          </div>

          {/* Add to Cart */}
          <div className="add-to-cart">
            <AddToCartButton itemId={item.id} />
          </div>
        </div>
      </main>

    )
  }
}