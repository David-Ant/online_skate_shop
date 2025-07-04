import type { stockItem } from "~/types/stock";

export default function DeckFilters({ stock }: { stock: stockItem[] }) {

    const brandFilters = [...new Set(stock.map(item => item.brand))];
    const widthFilters = [...new Set(stock.map(item => item.width))];

    return (
        <div>
            
            <h3 className="text-lg font-bold">Brand</h3>
            <ul>
                {brandFilters.map((brand) => (
                    <li className="py-1 flex items-center" key={brand}>
                        <input className="mr-2" type="checkbox" id={brand} />
                        <label htmlFor={brand}>{brand}</label>
                    </li>
                ))}
            </ul>

            <h3 className="text-lg font-bold">Width</h3>
            <ul>
                {widthFilters.map((width) => (
                    <li className="py-1 flex items-center" key={width}>
                        <input className="mr-2" type="checkbox" id={`width-${width}`} />
                        <label htmlFor={`width-${width}`}>{width}"</label>
                    </li>
                ))}
            </ul>
        </div>
    );
}