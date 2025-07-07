"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import StockGrid from "./StockGrid";
import type { stockItem } from "~/types/stock";
import DeckFilters from "./filters/DeckFilters";
import WheelFilters from "./filters/WheelFilters";

type FilterType = "DECK" | "WHEEL";

type DeckFilterState = {
    brands: Set<string>;
    widths: Set<number>;
};

type WheelFilterState = {
    brands: Set<string>;
    diameters: Set<number>;
    durometers: Set<string>;
};

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

    const [deckFilters, setDeckFilters] = useState<DeckFilterState>({
        brands: new Set(),
        widths: new Set(),
    })

    const [wheelFilters, setWheelFilters] = useState<WheelFilterState>({
        brands: new Set(),
        diameters: new Set(),
        durometers: new Set(),
    })

    function toggleBrands(brand: string) {
        if (filterType === "DECK") {
            setDeckFilters(prev => {
                const newBrands = new Set(prev.brands);
                if (newBrands.has(brand)) {
                    newBrands.delete(brand);
                } else {
                    newBrands.add(brand);
                }
                return { ...prev, brands: newBrands };
            })
        } 
        if (filterType === "WHEEL") {
            setWheelFilters(prev => {
                const newBrands = new Set(prev.brands);
                if (newBrands.has(brand)) {
                    newBrands.delete(brand);
                } else {
                    newBrands.add(brand);
                }
                return { ...prev, brands: newBrands };
            })
        }
    }

    function toggleWidths(width: number) {
        setDeckFilters(prev => {
            const newWidths = new Set(prev.widths);
            if (newWidths.has(width)) {
                newWidths.delete(width);
            } else {
                newWidths.add(width);
            }
            return { ...prev, widths: newWidths };
        });
    }

    function toggleDiameters(diameter: number) {
        setWheelFilters(prev => {
            const newDiameters = new Set(prev.diameters);
            if (newDiameters.has(diameter)) {
                newDiameters.delete(diameter);
            } else {
                newDiameters.add(diameter);
            }
            return { ...prev, diameters: newDiameters };
        });
    }

    function toggleDurometers(durometer: string) {
        setWheelFilters(prev => {
            const newDurometers = new Set(prev.durometers);
            if (newDurometers.has(durometer)) {
                newDurometers.delete(durometer);
            } else {
                newDurometers.add(durometer);
            }
            return { ...prev, durometers: newDurometers };
        });
    }
    
    const filteredContent = content.filter((item) => {
        if (filterType === "DECK") {
            const brandMatch = deckFilters.brands.size === 0 || deckFilters.brands.has(item.brand);
            const widthMatch = deckFilters.widths.size === 0 || (item.width !== null && deckFilters.widths.has(item.width));
            return brandMatch && widthMatch;
        }

        if (filterType === "WHEEL") {
            const brandMatch = wheelFilters.brands.size === 0 || wheelFilters.brands.has(item.brand);
            const diameterMatch = wheelFilters.diameters.size === 0 || (item.diameter !== null && wheelFilters.diameters.has(item.diameter));
            const durometerMatch = wheelFilters.durometers.size === 0 || (item.durometer !== null && wheelFilters.durometers.has(item.durometer));
            return brandMatch && diameterMatch && durometerMatch;
        }

        return false;
    });

    const filters =
    filterType === "DECK" ? (
      <DeckFilters
        stock={content}
        filters={{ brands: deckFilters.brands, widths: deckFilters.widths }}
        onToggleBrand={toggleBrands}
        onToggleWidth={toggleWidths}
      />
    ) : (
      <WheelFilters
        stock={content}
        filters={{ brands: wheelFilters.brands, diameters: wheelFilters.diameters, durometers: wheelFilters.durometers }}
        onToggleBrand={toggleBrands}
        onToggleDiameter={toggleDiameters}
        onToggleDurometer={toggleDurometers}
      />
    );

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
                        <StockGrid items={filteredContent} onSelect={handleStockSubmit} filterText={search} />
                    </main>
                </div>
            </Modal>
        );
    }
}
