import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import {
    buildTrustPageMetadataWithWp,
    getTrustPageContentWithWp,
} from "@src/lib/wp/content";

export async function generateMetadata(): Promise<Metadata> {
    return buildTrustPageMetadataWithWp("contractors");
}

export default async function ContractorsPage() {
    const page = await getTrustPageContentWithWp("contractors");

    return <TrustPage page={page} />;
}
