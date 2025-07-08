"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import type { stockItem } from "~/types/stock";
import FilteredStock from "./filters/FilteredStock";

type FilterType = "DECK" | "WHEEL";

type ProductPickerProps = {
    open: boolean;
    onClose?: () => void;
    filterType: FilterType;
    content: stockItem[];
    handleStockSubmit?: (item: stockItem) => void;
};

export default function ProductPickerModal({
    open,
    onClose,
    filterType,
    content,
    handleStockSubmit
}: ProductPickerProps) {

    const [search, setSearch] = useState('');

    if (onClose && handleStockSubmit) {
        return (
            <Modal open={open} onClose={onClose}>
                <div className="flex justify-between items-left p-3">
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                </div>
                <FilteredStock filterType={filterType} stock={content} handleStockSubmit={handleStockSubmit} search={search} />
            </Modal>
        );
    }
}
