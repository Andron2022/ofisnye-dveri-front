// src/lib/cart/types.ts

export type CartOptionSnapshot = {
    groupKey: "box" | "openingSide" | "soundproofing" | "threshold";
    groupTitle: string;
    choiceId: string;
    choiceLabel: string;
    priceDelta: number;
};

export type CartAccessorySnapshot = {
    productId: number;
    name: string;
    slug: string;
    sku: string;
    image: string | null;
    price: number | null;
    qty: number;
};

export type CartItemInput = {
    productId: number;
    slug: string;
    path: string;
    name: string;
    sku: string;
    publicArticleNo: string | null;
    image: string | null;
    basePrice: number | null;
    selectedOptions: CartOptionSnapshot[];
    selectedAccessories: CartAccessorySnapshot[];
    quantity?: number;
};

export type CartItem = CartItemInput & {
    itemKey: string;
    quantity: number;
    unitPrice: number | null;
    lineTotal: number | null;
    addedAt: string;
    updatedAt: string;
};

export type CartTotals = {
    uniqueItemsCount: number;
    itemsCount: number;
    subtotal: number;
    hasUnknownPrices: boolean;
};

export type CartState = {
    items: CartItem[];
};
