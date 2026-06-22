import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import {
    buildTrustPageMetadataWithWp,
    getTrustPageContentWithWp,
} from "@src/lib/wp/content";

export async function generateMetadata(): Promise<Metadata> {
    return buildTrustPageMetadataWithWp("architects");
}

export default async function ArchitectsPage() {
    const page = await getTrustPageContentWithWp("architects");

    return <TrustPage page={page} />;
}
