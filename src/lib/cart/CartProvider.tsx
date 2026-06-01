"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from "react";
import type { ReactNode } from "react";
import type {
    CartAccessorySnapshot,
    CartItem,
    CartItemInput,
    CartOptionSnapshot,
    CartState,
    CartTotals,
} from "@src/lib/cart/types";

const CART_STORAGE_KEY = "ofisnye-dveri-cart-v1";
const MAX_CART_ITEM_QUANTITY = 99;

type CartAction =
    | { type: "replace"; state: CartState }
    | { type: "addItem"; itemInput: CartItemInput }
    | { type: "setQuantity"; itemKey: string; quantity: number }
    | { type: "removeItem"; itemKey: string }
    | { type: "clear" };

type CartContextValue = CartState & {
    totals: CartTotals;
    isHydrated: boolean;
    addItem: (itemInput: CartItemInput) => CartItem;
    setItemQuantity: (itemKey: string, quantity: number) => void;
    increaseItemQuantity: (itemKey: string) => void;
    decreaseItemQuantity: (itemKey: string) => void;
    removeItem: (itemKey: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function clampQuantity(quantity: number | undefined): number {
    if (!Number.isFinite(quantity)) return 1;
    return Math.max(1, Math.min(MAX_CART_ITEM_QUANTITY, Math.floor(quantity ?? 1)));
}

function normalizePrice(value: number | null | undefined): number | null {
    if (typeof value !== "number" || !Number.isFinite(value)) return null;
    return value;
}

function roundMoney(value: number): number {
    return Math.round(value * 100) / 100;
}

function getOptionsDelta(options: CartOptionSnapshot[]): number {
    return options.reduce((sum, option) => sum + option.priceDelta, 0);
}

function getAccessoriesTotal(accessories: CartAccessorySnapshot[]): number {
    return accessories.reduce((sum, accessory) => {
        if (accessory.price === null) return sum;
        return sum + accessory.price * accessory.qty;
    }, 0);
}

function getHasUnknownPrices(input: CartItemInput): boolean {
    return (
        input.basePrice === null ||
        input.selectedAccessories.some((accessory) => accessory.price === null)
    );
}

function buildCartItemKey(input: CartItemInput): string {
    const optionsPart = [...input.selectedOptions]
        .sort((a, b) => a.groupKey.localeCompare(b.groupKey))
        .map((option) => `${option.groupKey}:${option.choiceId}`)
        .join("|");

    const accessoriesPart = [...input.selectedAccessories]
        .filter((accessory) => accessory.qty > 0)
        .sort((a, b) => a.productId - b.productId)
        .map((accessory) => `${accessory.productId}:${accessory.qty}`)
        .join("|");

    return [input.productId, optionsPart, accessoriesPart].join("::");
}

function createCartItem(input: CartItemInput, now = new Date().toISOString()): CartItem {
    const basePrice = normalizePrice(input.basePrice);
    const unitPrice = getHasUnknownPrices(input)
        ? null
        : roundMoney((basePrice ?? 0) + getOptionsDelta(input.selectedOptions) + getAccessoriesTotal(input.selectedAccessories));
    const quantity = clampQuantity(input.quantity);

    return {
        ...input,
        basePrice,
        selectedAccessories: input.selectedAccessories.filter((accessory) => accessory.qty > 0),
        quantity,
        itemKey: buildCartItemKey(input),
        unitPrice,
        lineTotal: unitPrice === null ? null : roundMoney(unitPrice * quantity),
        addedAt: now,
        updatedAt: now,
    };
}

function recalculateItem(item: CartItem, quantity: number, updatedAt = new Date().toISOString()): CartItem {
    const nextQuantity = clampQuantity(quantity);
    const unitPrice = item.unitPrice;

    return {
        ...item,
        quantity: nextQuantity,
        lineTotal: unitPrice === null ? null : roundMoney(unitPrice * nextQuantity),
        updatedAt,
    };
}

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "replace":
            return action.state;

        case "addItem": {
            const nextItem = createCartItem(action.itemInput);
            const existingItem = state.items.find((item) => item.itemKey === nextItem.itemKey);

            if (!existingItem) {
                return {
                    items: [...state.items, nextItem],
                };
            }

            return {
                items: state.items.map((item) => (
                    item.itemKey === nextItem.itemKey
                        ? recalculateItem(item, item.quantity + nextItem.quantity)
                        : item
                )),
            };
        }

        case "setQuantity": {
            if (action.quantity <= 0) {
                return {
                    items: state.items.filter((item) => item.itemKey !== action.itemKey),
                };
            }

            return {
                items: state.items.map((item) => (
                    item.itemKey === action.itemKey
                        ? recalculateItem(item, action.quantity)
                        : item
                )),
            };
        }

        case "removeItem":
            return {
                items: state.items.filter((item) => item.itemKey !== action.itemKey),
            };

        case "clear":
            return {
                items: [],
            };

        default:
            return state;
    }
}

function getInitialState(): CartState {
    return {
        items: [],
    };
}

function isValidCartState(value: unknown): value is CartState {
    if (!value || typeof value !== "object") return false;
    const state = value as CartState;
    return Array.isArray(state.items);
}

function readCartFromStorage(): CartState {
    if (typeof window === "undefined") return getInitialState();

    try {
        const rawValue = window.localStorage.getItem(CART_STORAGE_KEY);
        if (!rawValue) return getInitialState();

        const parsed = JSON.parse(rawValue) as unknown;
        if (!isValidCartState(parsed)) return getInitialState();

        return {
            items: parsed.items.map((item) => recalculateItem(item, item.quantity, item.updatedAt)),
        };
    } catch {
        return getInitialState();
    }
}

function writeCartToStorage(state: CartState): void {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
}

function calculateTotals(items: CartItem[]): CartTotals {
    return {
        uniqueItemsCount: items.length,
        itemsCount: items.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: roundMoney(items.reduce((sum, item) => sum + (item.lineTotal ?? 0), 0)),
        hasUnknownPrices: items.some((item) => item.lineTotal === null),
    };
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, getInitialState());
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        dispatch({ type: "replace", state: readCartFromStorage() });
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;
        writeCartToStorage(state);
    }, [isHydrated, state]);

    const addItem = useCallback((itemInput: CartItemInput): CartItem => {
        const item = createCartItem(itemInput);
        dispatch({ type: "addItem", itemInput });
        return item;
    }, []);

    const setItemQuantity = useCallback((itemKey: string, quantity: number) => {
        dispatch({ type: "setQuantity", itemKey, quantity });
    }, []);

    const increaseItemQuantity = useCallback((itemKey: string) => {
        const item = state.items.find((cartItem) => cartItem.itemKey === itemKey);
        if (!item) return;
        dispatch({ type: "setQuantity", itemKey, quantity: item.quantity + 1 });
    }, [state.items]);

    const decreaseItemQuantity = useCallback((itemKey: string) => {
        const item = state.items.find((cartItem) => cartItem.itemKey === itemKey);
        if (!item) return;
        dispatch({ type: "setQuantity", itemKey, quantity: item.quantity - 1 });
    }, [state.items]);

    const removeItem = useCallback((itemKey: string) => {
        dispatch({ type: "removeItem", itemKey });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: "clear" });
    }, []);

    const totals = useMemo(() => calculateTotals(state.items), [state.items]);

    const value = useMemo<CartContextValue>(() => ({
        ...state,
        totals,
        isHydrated,
        addItem,
        setItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        clearCart,
    }), [
        state,
        totals,
        isHydrated,
        addItem,
        setItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        clearCart,
    ]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextValue {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart должен использоваться внутри CartProvider");
    }

    return context;
}
