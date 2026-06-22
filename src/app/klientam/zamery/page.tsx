import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import {
    buildTrustPageMetadataWithWp,
    getTrustPageContentWithWp,
} from "@src/lib/wp/content";

export async function generateMetadata(): Promise<Metadata> {
    return buildTrustPageMetadataWithWp("measurements");
}

export default async function MeasurementsPage() {
    const page = await getTrustPageContentWithWp("measurements");

    return <TrustPage page={page} />;
}
