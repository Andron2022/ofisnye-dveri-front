import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import {
    buildTrustPageMetadataWithWp,
    getTrustPageContentWithWp,
} from "@src/lib/wp/content";

export async function generateMetadata(): Promise<Metadata> {
    return buildTrustPageMetadataWithWp("warranty");
}

export default async function WarrantyPage() {
    const page = await getTrustPageContentWithWp("warranty");

    return <TrustPage page={page} />;
}
