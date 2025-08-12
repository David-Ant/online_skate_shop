"use client";

import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ItemPage() {

    const { id } = useParams();
    const verifiedId = Array.isArray(id) ? id[0] : id ?? "";

    const { data: order, isLoading, error } = api.admin.getOrderById.useQuery({
        id: verifiedId ?? "",
    })

    if (isLoading) return <div>Loading...</div>
    if (error) {
        console.error("Search error:", error);
        return <div>Error: {error.message}</div>;
    }
    if (order) {
        return (
            <main>
                <div className="px-6 py-8 bg-white min-w-[80%] max-w-4xl mx-auto rounded-lg shadow-md">
                    {order.stockItems.map((item) => (
                        <li key={item.id} className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 items-center w-full p-4 mb-4 last:mb-0 border-b border-gray-300 last:border-b-0">
                            <h3 className="justify-self-start">
                                {item.stock ? (
                                    <Image
                                        src={item.stock?.imageUrl ?? ""}
                                        alt={item.stock?.name ?? "Item Image"}
                                        width={100}
                                        height={100} />
                                ) : item.customOrder ? (
                                    <div className="flex items-center">
                                        <Image
                                            src={item.customOrder?.deck.imageUrl ?? ""}
                                            alt={item.customOrder?.deck.name ?? "Custom Order Deck Image"}
                                            width={100}
                                            height={100} />
                                        <Image
                                            src={item.customOrder?.wheels.imageUrl ?? ""}
                                            alt={item.customOrder?.wheels.name ?? "Custom Order Deck Image"}
                                            width={100}
                                            height={100} />
                                    </div>
                                ) : null}
                            </h3>
                            <h3 className="justify-self-center">Id: {item.stockId ?? item.customOrderId}</h3>
                            <h3 className="justify-self-end">Quantity: {item.quantity}</h3>
                        </li>
                    ))}
                </div>
            </main>

        )
    }
}