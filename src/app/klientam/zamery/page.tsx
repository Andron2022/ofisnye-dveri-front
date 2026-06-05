import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import { buildTrustPageMetadata, getTrustPageContent } from "@src/lib/content/trust-pages";

export const metadata: Metadata = buildTrustPageMetadata("measurements");

export default function MeasurementsPage() {
    return <TrustPage page={getTrustPageContent("measurements")} />;
}
