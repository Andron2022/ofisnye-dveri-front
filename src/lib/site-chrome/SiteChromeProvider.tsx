// src/lib/site-chrome/SiteChromeProvider.tsx

"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { defaultSiteChromeSettings } from "@src/lib/site-chrome/defaults";
import type { SiteChromeSettings } from "@src/lib/site-chrome/types";

const SiteChromeContext = createContext<SiteChromeSettings>(defaultSiteChromeSettings);

export function SiteChromeProvider({
  children,
  settings,
}: {
  children: ReactNode;
  settings?: SiteChromeSettings | null;
}) {
  return (
    <SiteChromeContext.Provider value={settings ?? defaultSiteChromeSettings}>
      {children}
    </SiteChromeContext.Provider>
  );
}

export function useSiteChromeSettings(): SiteChromeSettings {
  return useContext(SiteChromeContext);
}

export function replaceYearToken(value: string, year = new Date().getFullYear()): string {
  return value.replace(/\{year\}/gi, String(year));
}
