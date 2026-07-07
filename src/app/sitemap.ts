// src/app/sitemap.ts

import type { MetadataRoute } from "next";
import { getDoorSitemapCategories, getDoorSitemapProducts } from "@src/lib/woo/products";
import { getWallPanelsPageContent } from "@src/lib/wall-panels/content";
import { getWallPanelProductsByIds } from "@src/lib/wall-panels/products";
import { buildAbsoluteUrl, getDoorCategorySeo } from "@src/lib/seo/site";
import { getWpContentSitemapEntries } from "@src/lib/wp/content";

export const revalidate = 3600;

const STATIC_SEO_PATHS = [
    "/",
    getDoorCategorySeo().path,
    "/stenovye-paneli",
];

function mapStaticPath(path: string, priority: number): MetadataRoute.Sitemap[number] {
    return {
        url: buildAbsoluteUrl(path),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority,
    };
}

function mapWpPath(path: string, modified: string | undefined): MetadataRoute.Sitemap[number] {
    return {
        url: buildAbsoluteUrl(path),
        lastModified: modified ? new Date(modified) : new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
    };
}

function dedupeSitemapEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
    const map = new Map<string, MetadataRoute.Sitemap[number]>();

    for (const entry of entries) {
        map.set(entry.url, entry);
    }

    return [...map.values()];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticUrls = STATIC_SEO_PATHS.map((path, index) => mapStaticPath(path, index === 0 ? 1 : 0.8));

    const allUrls: MetadataRoute.Sitemap = [...staticUrls];

    try {
        const categories = await getDoorSitemapCategories();

        allUrls.push(
            ...categories.map((category) => ({
                url: buildAbsoluteUrl(category.path),
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: category.path === getDoorCategorySeo().path ? 0.8 : 0.75,
            })),
        );
    } catch (error) {
        console.error("Failed to build door category sitemap entries", error);
    }

    try {
        const products = await getDoorSitemapProducts();

        allUrls.push(
            ...products.map((product) => ({
                url: buildAbsoluteUrl(product.path),
                lastModified: new Date(),
                changeFrequency: "daily" as const,
                priority: 0.7,
            })),
        );
    } catch (error) {
        console.error("Failed to build door product sitemap entries", error);
    }


    try {
        const wallPanelsPage = await getWallPanelsPageContent();
        const wallPanelProducts = await getWallPanelProductsByIds(wallPanelsPage.productIds);

        allUrls.push(
            ...wallPanelProducts.map((product) => ({
                url: buildAbsoluteUrl(product.path),
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.65,
            })),
        );
    } catch (error) {
        console.error("Failed to build wall panel product sitemap entries", error);
    }

    try {
        const wpEntries = await getWpContentSitemapEntries();
        allUrls.push(...wpEntries.map((entry) => mapWpPath(entry.path, entry.modified)));
    } catch (error) {
        console.error("Failed to build WP content sitemap entries", error);
    }

    return dedupeSitemapEntries(allUrls);
}
