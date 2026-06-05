import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import { buildTrustPageMetadata, getTrustPageContent } from "@src/lib/content/trust-pages";

export const metadata: Metadata = buildTrustPageMetadata("delivery");

export default function DeliveryPage() {
    return <TrustPage page={getTrustPageContent("delivery")} />;
}
