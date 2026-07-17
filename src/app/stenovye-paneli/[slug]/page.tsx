// src/app/stenovye-paneli/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FooterPage from "@src/components/Footer";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import PopupPage from "@src/components/Popup";
import WallPanelDetailView from "@src/components/wall-panels/WallPanelDetailView";
import { buildSeoMetadata } from "@src/lib/seo/site";
import { stripHtml, truncateText } from "@src/lib/wp/format";
import { getWallPanelProductBySlug } from "@src/lib/wall-panels/products";

export const revalidate = 300;

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
    const { slug } = await params;
    const product = await getWallPanelProductBySlug(slug);

    if (!product) {
        return {
            title: "Стеновая панель не найдена",
            robots: { index: false, follow: false },
        };
    }

    const description = truncateText(
        stripHtml(product.shortDescriptionHtml || product.descriptionHtml || "Стеновая панель под проектный расчёт"),
        220,
    );

    return buildSeoMetadata({
        title: product.name,
        description,
        path: product.path,
        image: product.image ?? undefined,
        imageAlt: product.name,
        seo: product.seo,
    });
}

export default async function WallPanelProductPage({ params }: { params: PageParams }) {
    const { slug } = await params;
    const product = await getWallPanelProductBySlug(slug);

    if (!product) notFound();

    return (
        <>
            <TopBanner />
            <Header />

            <main id="nt_content">
                <WallPanelDetailView product={product} />
            </main>

            <FooterPage />
            <PopupPage />
        </>
    );
}
