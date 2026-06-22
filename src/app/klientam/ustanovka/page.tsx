import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import {
    buildTrustPageMetadataWithWp,
    getTrustPageContentWithWp,
} from "@src/lib/wp/content";

export async function generateMetadata(): Promise<Metadata> {
    return buildTrustPageMetadataWithWp("installation");
}

export default async function InstallationPage() {
    const page = await getTrustPageContentWithWp("installation");

    return <TrustPage page={page} />;
}
