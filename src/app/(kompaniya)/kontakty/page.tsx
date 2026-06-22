import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import {
    buildTrustPageMetadataWithWp,
    getTrustPageContentWithWp,
} from "@src/lib/wp/content";

export async function generateMetadata(): Promise<Metadata> {
    return buildTrustPageMetadataWithWp("contacts");
}

export default async function ContactsPage() {
    const page = await getTrustPageContentWithWp("contacts");

    return <TrustPage page={page} />;
}
