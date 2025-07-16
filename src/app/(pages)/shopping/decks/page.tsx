"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import FilteredStock from "~/app/_components/filters/FilteredStock";
import type { stockItem } from "~/types/stock";

export default function ProductPage() {

    const router = useRouter();

    const handleOnClick = (image: stockItem) => {
        router.push(`/item/${image.id}`);
    };

    const { data: deckStock, isLoading, error } = api.stock.getStockByType.useQuery({
        type: "DECK",
    });

    if (isLoading) return <div>Loading...</div>
    if (error) {
        console.error("Search error:", error);
        return <div>Error: {error.message}</div>;
    }
    if (deckStock) {
        return (
            <main>
                <FilteredStock filterType={"DECK"} stock={deckStock} handleStockSubmit={handleOnClick}/>
            </main>
        );
    }
}