"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

const CustomOrderButton = ({ deckId, wheelsId }: { deckId: string, wheelsId: string }) => {
    const [loading, setLoading] = useState(false);
    const addToCart = api.cart.addCustomOrderToCart.useMutation();

    const handleClick = async () => {
        setLoading(true);
        try {
            await addToCart.mutateAsync({ deckId, wheelsId, quantity: 1 });
            alert("Custom order added to cart!");
        } catch (error) {
            console.error(error);
            alert(`Failed to add custom order to cart. deckId: ${deckId} wheelsId: ${wheelsId}`);
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

export default CustomOrderButton;
