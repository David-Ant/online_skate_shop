export type stockItem = {
    id: string;
    type: string;
    cost: number;
    name: string;
    brand: string;
    imageUrl: string;
    width: number | null;
    length: number | null;
    axelDistance: number | null;
    diameter: number | null;
    durometer: string | null;
};  

export type customOrderItem = {
    id: string;
    cost: number;
    deck: stockItem;
    wheels: stockItem;
}

export type cartItem = {
    id: string;
    stock: stockItem | null;
    customOrder: customOrderItem | null;
};