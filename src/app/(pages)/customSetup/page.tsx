"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import ProductPickerModal from "~/app/_components/ProductPickerModal";
import CustomOrderButton from "~/app/_components/CustomOrderButton";
import type { stockItem } from "~/types/stock";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function ProductPage() {

    const [deck, setDeck] = useState<stockItem | undefined>(undefined);
    const [wheels, setWheels] = useState<stockItem | undefined>(undefined);
    const [deckModalOpen, setDeckModalOpen] = useState(false);
    const [wheelsModalOpen, setWheelsModalOpen] = useState(false);
    
    const { data: allStock, isLoading, error } = api.stock.getStock.useQuery();
    const deckStock = allStock?.filter((item) => item.type === "DECK");
    const wheelStock = allStock?.filter((item) => item.type === "WHEEL");

    if (isLoading) return <div>Loading...</div>

    if (error) {
        console.error("Search error:", error);
        return <div>Error: {error.message}</div>;
    }

    const handleDeckSubmit = (value: stockItem): void => {
        setDeck(value);
        setDeckModalOpen(false);
    }
    const handleWheelsSubmit = (value: stockItem): void => {
        setWheels(value);
        setWheelsModalOpen(false);
    }

    return (
        <main>
            <h2 className="p-3 pl-10">
                Make your own custom skateboard
            </h2>
            <div className="flex justify-between pl-10 pr-10 pt-3">
                <div className="flex flex-col items-start justify-start max-w-[260px]">
                    <i>Pick a deck</i>
                    <i>Pick a set of wheels</i>
                    <i>We assemble it for you</i>
                </div>
                <div className="flex flex-col items-start justify-start max-w-[260px] pl-12">
                    <button
                        onClick={() => setDeckModalOpen(true)}
                        className="w-[250px] h-[250px] flex items-center justify-center rounded-[10px] bg-[#e0e0e0] text-[1rem] text-[#333] font-bold cursor-pointer overflow-hidden transition-colors duration-200 ease-in-out shadow"
                    >
                        {deck ? (
                            <div className="relative w-[90%] h-[90%]">
                            <Image
                                src={deck.imageUrl}
                                    fill
                                    className="rounded object-cover"
                                alt={`Deck: ${deck.name}`}
                            />
                            </div>
                        ) : (
                            <p>Select Deck</p>
                        )}
                    </button>
                    {deck ? (
                        <div>
                            <h2>{deck.name}</h2>
                            <p>Brand: {deck.brand}</p>
                            <p>Width: {deck.width + '"'}</p>
                            <p>Cost: {deck.cost}€</p>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className="flex flex-col items-start justify-start max-w-[260px] pr-12">
                    <button
                        onClick={() => setWheelsModalOpen(true)}
                        className="w-[250px] h-[250px] flex items-center justify-center rounded-[10px] bg-[#e0e0e0] text-[1rem] text-[#333] font-bold cursor-pointer overflow-hidden transition-colors duration-200 ease-in-out shadow">

                        {wheels ? (
                            <div className="relative w-[90%] h-[90%]">
                            <Image
                                src={wheels.imageUrl}
                                    fill
                                    className="rounded object-cover"
                                alt={`Wheels: ${wheels.name}`}
                            />
                            </div>
                        ) : (
                            <p>Select Wheels</p>
                        )}
                    </button>
                    {wheels ? (
                        <div>
                            <h2>{wheels.name}</h2>
                            <p>Brand: {wheels.brand}</p>
                            <p>Durometer: {wheels.durometer}</p>
                            <p>Cost: {wheels.cost}€</p>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
                <div>
                    <div className={wheels && deck ?
                        "w-[140px] h-[40px] flex items-center justify-center bg-orange-500 border border-white/30 rounded-lg font-semibold text-[16px] text-white cursor-pointer shadow"
                        : "w-[140px] h-[40px] flex items-center justify-center bg-gray-500 border border-black/10 rounded-lg font-semibold text-[16px] text-white shadow-inner"}>
                        <CustomOrderButton
                            deckId={deck ? deck.id : ""}
                            wheelsId={wheels ? wheels.id : ""}
                        />
                    </div>
                    {wheels && deck && (
                        <p>Cost: {(Math.round((deck.cost + wheels.cost + 5) * 100) / 100)}€</p>
                    )}
                </div>
            </div>

            <div className="w-1/2 p-4 bg-gray-200">
                <ProductPickerModal
                    open={deckModalOpen}
                    onClose={() => setDeckModalOpen(false)}
                    filterType="DECK"
                    content={deckStock ?? []}
                    handleStockSubmit={handleDeckSubmit}
                />
            </div>
            <div className="w-1/2 p-4 bg-gray-200">
                <ProductPickerModal
                    open={wheelsModalOpen}
                    onClose={() => setWheelsModalOpen(false)}
                    filterType="WHEEL"
                    content={wheelStock ?? []}
                    handleStockSubmit={handleWheelsSubmit}
                />
            </div>
        </main>
    )
}