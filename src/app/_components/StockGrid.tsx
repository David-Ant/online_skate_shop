import Image from "next/image";
import type { stockItem } from "~/types/stock";

type StockGridProps = {
  items: stockItem[];
  onSelect: (item: stockItem) => void;
  filterText?: string;
};

export default function StockGrid({ items, onSelect, filterText = "" }: StockGridProps) {
  return (
    <div className="flex flex-wrap gap-6">
      {items
        .filter((item) =>
          item.name.toLowerCase().includes(filterText.toLowerCase())
        )
        .map((item) => (
          <button key={item.id} onClick={() => onSelect(item)}>
            <div className="flex w-48 flex-col">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={192}
                height={192}
              />
              <div className="p-3">
                <div className="text-sm">{item.name}</div>
                <div className="text-sm">{item.cost}€</div>
              </div>
            </div>
          </button>
        ))}
    </div>
  );
}