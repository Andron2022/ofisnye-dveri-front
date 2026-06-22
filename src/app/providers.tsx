"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@src/lib/cart/CartProvider";
import { NavigationProvider } from "@src/lib/navigation/NavigationProvider";
import type { NavigationContextValue } from "@src/lib/navigation/NavigationProvider";

export default function Providers({
    children,
    navigation,
}: {
    children: ReactNode;
    navigation?: Partial<NavigationContextValue> | null;
}) {
    return (
        <NavigationProvider navigation={navigation}>
            <CartProvider>{children}</CartProvider>
        </NavigationProvider>
    );
}
