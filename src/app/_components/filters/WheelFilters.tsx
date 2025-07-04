import type { stockItem } from "~/types/stock";

export default function WheelFilters({ stock }: { stock: stockItem[] }) {

    const brandFilters = [...new Set(stock.map(item => item.brand))];
    const diameterFilters = [...new Set(stock.map(item => item.diameter))];
    const durometerFilters = [...new Set(stock.map(item => item.durometer))];

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

            <h3 className="text-lg font-bold">Diameter</h3>
            <ul>
                {diameterFilters.map((diameter) => (
                    <li className="py-1 flex items-center" key={diameter}>
                        <input className="mr-2" type="checkbox" id={`size-${diameter}`} />
                        <label htmlFor={`size-${diameter}`}>{diameter}mm</label>
                    </li>
                ))}
            </ul>

            <h3 className="text-lg font-bold">Durometer</h3>
            <ul>
                {durometerFilters.map((durometer) => (
                    <li className="py-1 flex items-center" key={durometer}>
                        <input className="mr-2" type="checkbox" id={`size-${durometer}`} />
                        <label htmlFor={`size-${durometer}`}>{durometer}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
}