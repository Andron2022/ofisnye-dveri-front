"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@src/lib/cart/CartProvider";

export default function Providers({ children }: { children: ReactNode }) {
    return <CartProvider>{children}</CartProvider>;
}
