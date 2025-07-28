import type { stockItem } from "~/types/stock";

type DeckFiltersProps = {
    stock: stockItem[];
    filters: {
        brands: Set<string>;
        widths: Set<number>;
    };
    onToggleBrand: (brand: string) => void;
    onToggleWidth: (width: number) => void;
}

export default function DeckFilters({
    stock,
    filters,
    onToggleBrand,
    onToggleWidth,
}: DeckFiltersProps) {

    const allBrands = [...new Set(stock.map(item => item.brand))];
    const allWidths = [...new Set(stock.map(item => item.width))];

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

            <h3 className="text-lg font-bold">Width</h3>
            <ul>
                {allWidths
                    .filter((width): width is number => width !== null)
                    .map((width) => (
                        <li className="py-1 flex items-center" key={width}>
                            <input
                                className="mr-2"
                                type="checkbox"
                                id={`width-${width}`}
                                checked={filters.widths.has(width)}
                                onChange={() => onToggleWidth(width)}
                            />
                            <label htmlFor={`width-${width}`}>{width + '"'}</label>
                        </li>
                    ))}
            </ul>
        </div>
    );
}