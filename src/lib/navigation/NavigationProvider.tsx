// src/lib/navigation/NavigationProvider.tsx

"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { siteNavigation } from "@src/lib/navigation/site-menu";
import type { SiteNavigationItem } from "@src/lib/navigation/site-menu";

export type NavigationContextValue = {
    headerNavigation: SiteNavigationItem[];
    footerNavigation: SiteNavigationItem[];
};

const fallbackNavigationContext: NavigationContextValue = {
    headerNavigation: siteNavigation,
    footerNavigation: siteNavigation,
};

const NavigationContext = createContext<NavigationContextValue>(fallbackNavigationContext);

export function NavigationProvider({
    children,
    navigation,
}: {
    children: ReactNode;
    navigation?: Partial<NavigationContextValue> | null;
}) {
    return (
        <NavigationContext.Provider
            value={{
                headerNavigation: navigation?.headerNavigation?.length
                    ? navigation.headerNavigation
                    : fallbackNavigationContext.headerNavigation,
                footerNavigation: navigation?.footerNavigation?.length
                    ? navigation.footerNavigation
                    : fallbackNavigationContext.footerNavigation,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
}

export function useHeaderNavigation(): SiteNavigationItem[] {
    return useContext(NavigationContext).headerNavigation;
}

export function useFooterNavigation(): SiteNavigationItem[] {
    return useContext(NavigationContext).footerNavigation;
}
