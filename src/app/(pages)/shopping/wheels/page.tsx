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

    const { data: wheelStock, isLoading, error } = api.stock.getStockByType.useQuery({
        type: "WHEEL",
    });

    if (isLoading) return <div>Loading...</div>
    if (error) {
        console.error("Search error:", error);
        return <div>Error: {error.message}</div>;
    }
    if (wheelStock) {
        return (
            <main>
                <FilteredStock filterType={"WHEEL"} stock={wheelStock} handleStockSubmit={handleOnClick}/>
            </main>
        );
    }
}