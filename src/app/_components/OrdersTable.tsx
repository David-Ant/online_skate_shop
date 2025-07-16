"use client";

import { api } from "~/trpc/react";
import { OrderStatus } from "@prisma/client";

export default function OrdersTable() {

    const { data: orders, isLoading, refetch } = api.admin.getOrders.useQuery();

    const changeStatus = api.admin.changeStatus.useMutation({
        onSuccess: () => {
            refetch();
        },
    });

    const handleChangeStatus = (orderId: string, newStatus: OrderStatus) => {
        changeStatus.mutate({ orderId, status: newStatus });
    };

    if (isLoading) {
        return <p>Loading orders...</p>;
    }

    if (!orders || orders.length === 0) {
        return <p>No registered orders.</p>;
    }
    return (
        <main>
            <div className="px-6 py-8 bg-white min-w-[80%] max-w-4xl mx-auto rounded-lg shadow-md">
                {orders.map((item) => (
                    <li key={item.id} className="flex flex-row justify-between p-4 mb-4 last:mb-0 border-b border-gray-300 last:border-b-0">
                        <h3>User: {item.userId}</h3>
                        <h3>Date: {item.date.toString()}</h3>
                        <h3>
                            Status:
                            <select
                                value={item.status}
                                onChange={(e) =>
                                    handleChangeStatus(item.id, e.target.value as OrderStatus)
                                }
                                className="ml-2 border"
                            >
                                {Object.values(OrderStatus).map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </h3>
                    </li>
                ))}
            </div>
        </main>
    )
}