import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import {
    buildTrustPageMetadataWithWp,
    getTrustPageContentWithWp,
} from "@src/lib/wp/content";

export async function generateMetadata(): Promise<Metadata> {
    return buildTrustPageMetadataWithWp("care");
}

export default async function CareAndMaintenancePage() {
    const page = await getTrustPageContentWithWp("care");

    return <TrustPage page={page} />;
}
