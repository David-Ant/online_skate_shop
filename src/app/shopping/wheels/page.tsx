"use client";

import Link from "next/link";

import { api } from "~/trpc/react";

export default function ProductPage() {

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
            <main className="">
                <div className="flex flex-wrap gap-6">
                    {wheelStock.map((image) => (
                        <Link href={`/item/${image.id}`} key={image.id}>
                            <div key={image.id} className="flex w-48 flex-col">
                                <img src={image.imageUrl} />
                                <div className="bg-gradient-to-b from-white to-transparent p-3">
                                    <div className="text-sm">{image.name}</div>
                                    <div>{image.cost}€</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        );
    }
}