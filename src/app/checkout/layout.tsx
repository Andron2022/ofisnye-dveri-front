import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Оформление заказа",
    description: "Оформление заказа межкомнатных дверей и дополнительной фурнитуры.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
    return children;
}
