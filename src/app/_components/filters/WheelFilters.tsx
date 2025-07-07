import type { stockItem } from "~/types/stock";

type WheelFiltersProps = {
    stock: stockItem[];
    filters: {
        brands: Set<string>;
        diameters: Set<number>;
        durometers: Set<string>;
    };
    onToggleBrand: (brand: string) => void;
    onToggleDiameter: (diameter: number) => void;
    onToggleDurometer: (durometer: string) => void;
}

export default function WheelFilters({
    stock,
    filters,
    onToggleBrand,
    onToggleDiameter,
    onToggleDurometer,
}: WheelFiltersProps) {

    const allBrands = [...new Set(stock.map(item => item.brand))];
    const allDiameters = [...new Set(stock.map(item => item.diameter))];
    const allDurometers = [...new Set(stock.map(item => item.durometer))];

    return (
        <div>

            <h3 className="text-lg font-bold">Brand</h3>
            <ul>
                {allBrands.map((brand) => (
                    <li className="py-1 flex items-center" key={brand}>
                        <input
                            className="mr-2"
                            type="checkbox"
                            id={brand}
                            checked={filters.brands.has(brand)}
                            onChange={() => onToggleBrand(brand)}
                        />
                        <label htmlFor={brand}>{brand}</label>
                    </li>
                ))}
            </ul>

            <h3 className="text-lg font-bold">Diameter</h3>
            <ul>
                {allDiameters
                    .filter((diameter): diameter is number => diameter !== null)
                    .map((diameter) => (
                    <li className="py-1 flex items-center" key={diameter}>
                        <input
                            className="mr-2"
                            type="checkbox"
                            id={`diameter-${diameter}`}
                            checked={filters.diameters.has(diameter)}
                            onChange={() => onToggleDiameter(diameter)}
                        />
                        <label htmlFor={`size-${diameter}`}>{diameter}mm</label>
                    </li>
                ))}
            </ul>

            <h3 className="text-lg font-bold">Durometer</h3>
            <ul>
                {allDurometers
                    .filter((durometer): durometer is string => durometer !== null)
                    .map((durometer) => (
                        <li className="py-1 flex items-center" key={durometer}>
                            <input
                                className="mr-2"
                                type="checkbox"
                                id={durometer}
                                checked={filters.durometers.has(durometer)}
                                onChange={() => onToggleDurometer(durometer)}
                            />
                            <label htmlFor={`size-${durometer}`}>{durometer}</label>
                        </li>
                    ))}
            </ul>
        </div>
    );
}