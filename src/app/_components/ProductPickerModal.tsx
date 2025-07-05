"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import StockGrid from "./StockGrid";
import type { stockItem } from "~/types/stock";

type ProductPickerProps = {
    open: boolean;
    onClose?: () => void;
    filters: React.ReactNode;
    content: stockItem[];
    handleStockSubmit?: (item: stockItem) => void;
};

export default function ProductPickerModal({
    open,
    onClose,
    filters,
    content,
    handleStockSubmit
}: ProductPickerProps) {

    const [search, setSearch] = useState('');
    if (onClose && handleStockSubmit) {
        return (
            <Modal open={open} onClose={onClose}>
                <aside className="w-32 bg-gray-100 overflow-y-auto rounded-l-lg shadow-md relative">
                    <div className="text-lg font-semibold p-4">Filters</div>
                    <div className="p-4">{filters}</div>
                </aside>

                <div className="flex flex-col items-end bg-white p-2 rounded-r-lg h-full w-full">
                    <div className="flex justify-between items-center pb-2 w-full">
                        <div id="search-box">
                            <input
                                type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="border p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            />
                        </div>
                    </div>
                    <main className="flex-1 max-w-[450px] overflow-y-scroll w-full">
                        <StockGrid items={content} onSelect={handleStockSubmit} filterText={search}/>
                    </main>
                </div>
            </Modal>
        );
    }
}
