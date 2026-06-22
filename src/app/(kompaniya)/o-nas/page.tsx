import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import {
    buildTrustPageMetadataWithWp,
    getTrustPageContentWithWp,
} from "@src/lib/wp/content";

export async function generateMetadata(): Promise<Metadata> {
    return buildTrustPageMetadataWithWp("about");
}

export default async function AboutPage() {
    const page = await getTrustPageContentWithWp("about");

    return <TrustPage page={page} />;
}
