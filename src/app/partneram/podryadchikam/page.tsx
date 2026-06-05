import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import { buildTrustPageMetadata, getTrustPageContent } from "@src/lib/content/trust-pages";

export const metadata: Metadata = buildTrustPageMetadata("contractors");

export default function ContractorsPage() {
    return <TrustPage page={getTrustPageContent("contractors")} />;
}
