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
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;