"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@src/lib/cart/CartProvider";
import { NavigationProvider } from "@src/lib/navigation/NavigationProvider";
import type { NavigationContextValue } from "@src/lib/navigation/NavigationProvider";
import { SiteChromeProvider } from "@src/lib/site-chrome/SiteChromeProvider";
import type { SiteChromeSettings } from "@src/lib/site-chrome/types";

export default function Providers({
    children,
    navigation,
    siteChrome,
}: {
    children: ReactNode;
    navigation?: Partial<NavigationContextValue> | null;
    siteChrome?: SiteChromeSettings | null;
}) {
    return (
        <NavigationProvider navigation={navigation}>
            <SiteChromeProvider settings={siteChrome}>
                <CartProvider>{children}</CartProvider>
            </SiteChromeProvider>
        </NavigationProvider>
    );
}
