"use client";

import { useState } from "react";
import StockGrid from "../StockGrid";
import type { stockItem } from "~/types/stock";
import DeckFilters from "./DeckFilters";
import WheelFilters from "./WheelFilters";

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

type FilteredStockProps = {
    filterType: FilterType,
    stock: stockItem[],
    handleStockSubmit: (item: stockItem) => void,
    search?: string,
}

export default function FilteredStock({
    filterType,
    stock,
    handleStockSubmit,
    search
}: FilteredStockProps) {

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

    const filteredContent = stock.filter((item) => {
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
                stock={stock}
                filters={{ brands: deckFilters.brands, widths: deckFilters.widths }}
                onToggleBrand={toggleBrands}
                onToggleWidth={toggleWidths}
            />
        ) : (
            <WheelFilters
                stock={stock}
                filters={{ brands: wheelFilters.brands, diameters: wheelFilters.diameters, durometers: wheelFilters.durometers }}
                onToggleBrand={toggleBrands}
                onToggleDiameter={toggleDiameters}
                onToggleDurometer={toggleDurometers}
            />
        );

    return (
        <div className="flex h-full">
            <aside className="w-32 min-w-27 bg-gray-100 overflow-y-auto shadow-md relative">
                <div className="text-lg font-semibold p-4">Filters</div>
                <div className="p-4">{filters}</div>
            </aside>
            <div className="flex flex-col items-end bg-white p-2 h-full w-full">
                <main className="flex-1 overflow-y-scroll w-full">
                    <StockGrid items={filteredContent} onSelect={handleStockSubmit} filterText={search} />
                </main>
            </div>
        </div>
    )
}