"use client";

import { api } from "~/trpc/react";
import { OrderStatus } from "@prisma/client";
import Link from "next/link";

export default function OrdersTable() {

    const { data: orders, isLoading, refetch } = api.admin.getOrders.useQuery();

    const changeStatus = api.admin.changeStatus.useMutation({
        onSuccess: () => {
            void refetch();
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
                    <li key={item.id} className="grid grid-rows-4 md:grid-rows-1 md:grid-cols-4 items-center w-full p-4 mb-4 last:mb-0 border-b border-gray-300 last:border-b-0">
                        <Link href={`/adminPanel/order/${item.id}`} key={item.id}>
                            <h3 className="justify-self-start">View order</h3>
                        </Link>
                        <h3 className="justify-self-start">User: {item.userId}</h3>
                        <h3 className="justify-self-center">Date: {item.date.toString()}</h3>
                        <h3 className="justify-self-end">
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