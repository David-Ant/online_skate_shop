"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

const AddToCartButton = ({ itemId }: { itemId: string }) => {
  const [loading, setLoading] = useState(false);
  const addToCart = api.cart.addToCart.useMutation();

  const handleClick = async () => {
    setLoading(true);
    try {
      await addToCart.mutateAsync({ itemId, quantity: 1 });
      alert("Item added to cart!");
    } catch (error) {
      alert("Failed to add item to cart.");
      console.error("Error adding item to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-8 py-3 bg-blue-500 text-white rounded-md text-base font-semibold cursor-pointer transition-colors duration-300 hover:bg-blue-700"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;