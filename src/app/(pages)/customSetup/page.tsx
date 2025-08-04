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
        <main className="flex flex-col items-center justify-center w-full h-full p-4 bg-linear-to-b from-amber-200 to-gray-200">
            <div className="flex-row items-center justify-center max-w-[50%] pb-4">
                <h2 className="pb-5 items-center justify-center !text-5xl font-bold">
                    Make your own custom skateboard
                </h2>
                <div className="flex flex-col items-start justify-start max-w-[260px] pl-6">
                    <i>Pick a deck</i>
                    <i>Pick a set of wheels</i>
                    <i>We assemble it for you</i>
                </div>
            </div>
            <div className="flex items-start justify-between px-10 py-3 space-x-12">
                <div className={`flex flex-col items-start justify-start max-w-[260px] rounded-[10px] ${deck ? "bg-white border border-gray-300" : "bg-[#e0e0e0]"} shadow-md`}>
                    <button
                        onClick={() => setDeckModalOpen(true)}
                        className="w-[250px] h-[250px] flex items-center justify-center text-[1rem] text-[#333] font-bold cursor-pointer"
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
                        <div className="p-4">
                            <h2>{deck.name}</h2>
                            <p>Brand: {deck.brand}</p>
                            <p>Width: {deck.width + '"'}</p>
                            <p>Cost: {deck.cost}€</p>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className={`flex flex-col items-start justify-start max-w-[260px] rounded-[10px] ${wheels ? "bg-white border border-gray-300" : "bg-[#e0e0e0]"} shadow-md`}>
                    <button
                        onClick={() => setWheelsModalOpen(true)}
                        className="w-[250px] h-[250px] flex items-center justify-center text-[1rem] text-[#333] font-bold cursor-pointer">

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
                        <div className="p-4">
                            <h2>{wheels.name}</h2>
                            <p>Brand: {wheels.brand}</p>
                            <p>Durometer: {wheels.durometer}</p>
                            <p>Cost: {wheels.cost}€</p>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className="w-[180px] space-y-4">
                    <div className={wheels && deck ?
                        "h-[40px] flex items-center justify-center bg-orange-500 border border-white/30 rounded-lg font-semibold text-[16px] text-white cursor-pointer shadow-md"
                        : "h-[40px] flex items-center justify-center bg-gray-500 border border-black/10 rounded-lg font-semibold text-[16px] text-white shadow-inner"}>
                        <CustomOrderButton
                            deckId={deck ? deck.id : ""}
                            wheelsId={wheels ? wheels.id : ""}
                        />
                    </div>
                    {wheels && deck && (
                        <div className="bg-white/80 p-4 rounded-lg shadow-md border border-gray-300">
                            <p className="font-bold mb-2">Cost</p>
                            <p>Deck: {deck.cost}€</p>
                            <p>Wheels: {wheels.cost}€</p>
                            <p>Assembly: 5€</p>
                            <hr className="my-2" />
                            <p className="font-semibold">Total: {(Math.round((deck.cost + wheels.cost + 5) * 100) / 100)}€</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-1/2 p-4 bg-none">
                <ProductPickerModal
                    open={deckModalOpen}
                    onClose={() => setDeckModalOpen(false)}
                    filterType="DECK"
                    content={deckStock ?? []}
                    handleStockSubmit={handleDeckSubmit}
                />
            </div>
            <div className="w-1/2 p-4 bg-none">
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