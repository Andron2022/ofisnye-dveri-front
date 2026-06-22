import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import {
    buildTrustPageMetadataWithWp,
    getTrustPageContentWithWp,
} from "@src/lib/wp/content";

export async function generateMetadata(): Promise<Metadata> {
    return buildTrustPageMetadataWithWp("delivery");
}

export default async function DeliveryPage() {
    const page = await getTrustPageContentWithWp("delivery");

    return <TrustPage page={page} />;
}
