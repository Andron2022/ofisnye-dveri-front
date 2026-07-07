// src/app/stenovye-paneli/page.tsx

import type { Metadata } from "next";
import FooterPage from "@src/components/Footer";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import PopupPage from "@src/components/Popup";
import WallPanelsPageView from "@src/components/wall-panels/WallPanelsPageView";
import { buildWallPanelsMetadata, getWallPanelsPageContent } from "@src/lib/wall-panels/content";
import { getWallPanelProductsByIds } from "@src/lib/wall-panels/products";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
    return buildWallPanelsMetadata();
}

export default async function WallPanelsPage() {
    const content = await getWallPanelsPageContent();
    let loadError: string | null = null;
    let products: Awaited<ReturnType<typeof getWallPanelProductsByIds>> = [];

    try {
        products = await getWallPanelProductsByIds(content.productIds);
    } catch (error) {
        loadError = error instanceof Error
            ? error.message
            : "Не удалось загрузить карточки стеновых панелей.";
    }

    return (
        <>
            <TopBanner />
            <Header />

            <main id="nt_content">
                <WallPanelsPageView content={content} products={products} loadError={loadError} />
            </main>

            <FooterPage />
            <PopupPage />
        </>
    );
}
