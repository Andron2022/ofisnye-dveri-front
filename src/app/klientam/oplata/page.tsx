import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import {
    buildTrustPageMetadataWithWp,
    getTrustPageContentWithWp,
} from "@src/lib/wp/content";

export async function generateMetadata(): Promise<Metadata> {
    return buildTrustPageMetadataWithWp("payment");
}

export default async function PaymentPage() {
    const page = await getTrustPageContentWithWp("payment");

    return <TrustPage page={page} />;
}
