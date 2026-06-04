// src/app/sitemap.ts

import type { MetadataRoute } from "next";
import { getDoorSitemapProducts } from "@src/lib/woo/products";
import { buildAbsoluteUrl, getDoorCategorySeo } from "@src/lib/seo/site";

export const revalidate = 3600;

const STATIC_SEO_PATHS = [
    "/",
    getDoorCategorySeo().path,
    getDoorCategorySeo("skrytye").path,
    getDoorCategorySeo("protivopozharnye").path,
];

function mapStaticPath(path: string, priority: number): MetadataRoute.Sitemap[number] {
    return {
        url: buildAbsoluteUrl(path),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority,
    };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticUrls = STATIC_SEO_PATHS.map((path, index) => mapStaticPath(path, index === 0 ? 1 : 0.8));

    try {
        const products = await getDoorSitemapProducts();

        return [
            ...staticUrls,
            ...products.map((product) => ({
                url: buildAbsoluteUrl(product.path),
                lastModified: new Date(),
                changeFrequency: "daily" as const,
                priority: 0.7,
            })),
        ];
    } catch (error) {
        console.error("Failed to build door product sitemap entries", error);
        return staticUrls;
    }
}
