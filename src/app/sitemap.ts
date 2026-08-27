// src/app/sitemap.ts

import type { MetadataRoute } from "next";
import { getWpHomepageContent } from "@src/lib/home/wp-homepage";
import { buildAbsoluteUrl, getDoorCategorySeo } from "@src/lib/seo/site";
import {
  getDoorSeoLandingSitemapEntries,
  getDoorSitemapCategories,
  getDoorSitemapProducts,
} from "@src/lib/woo/products";
import { getWallPanelsPageContent } from "@src/lib/wall-panels/content";
import { getWallPanelProductsByIds } from "@src/lib/wall-panels/products";
import { getWpContentSitemapEntries } from "@src/lib/wp/content";
import { isSiteIndexingEnabled } from "@src/lib/runtime/environment";

export const revalidate = 3600;

type SitemapEntryOptions = {
  path: string;
  modified?: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

function parseLastModified(value: string | undefined): Date | undefined {
  if (!value) return undefined;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function mapSitemapEntry({
  path,
  modified,
  changeFrequency,
  priority,
}: SitemapEntryOptions): MetadataRoute.Sitemap[number] {
  const lastModified = parseLastModified(modified);

  return {
    url: buildAbsoluteUrl(path),
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
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
  if (!isSiteIndexingEnabled()) return [];

  const allUrls: MetadataRoute.Sitemap = [];

  try {
    const homepage = await getWpHomepageContent();

    if (!homepage.seo.noindex) {
      allUrls.push(
        mapSitemapEntry({
          path: "/",
          modified: homepage.seo.modified,
          changeFrequency: "weekly",
          priority: 1,
        }),
      );
    }
  } catch (error) {
    console.error("Failed to build homepage sitemap entry", error);
    allUrls.push(
      mapSitemapEntry({ path: "/", changeFrequency: "weekly", priority: 1 }),
    );
  }

  try {
    const categories = await getDoorSitemapCategories();

    allUrls.push(
      ...categories
        .filter((category) => !category.seo.noindex)
        .map((category) =>
          mapSitemapEntry({
            path: category.path,
            changeFrequency: "weekly",
            priority: category.path === getDoorCategorySeo().path ? 0.8 : 0.75,
          }),
        ),
    );
  } catch (error) {
    console.error("Failed to build door category sitemap entries", error);
    allUrls.push(
      mapSitemapEntry({
        path: getDoorCategorySeo().path,
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    );
  }

  try {
    const landings = await getDoorSeoLandingSitemapEntries();

    allUrls.push(
      ...landings
        .filter((landing) => !landing.seo.noindex && landing.productCount > 0)
        .map((landing) =>
          mapSitemapEntry({
            path: landing.path,
            modified: landing.modified,
            changeFrequency: "weekly",
            priority: 0.72,
          }),
        ),
    );
  } catch (error) {
    console.error("Failed to build door SEO landing sitemap entries", error);
  }

  try {
    const products = await getDoorSitemapProducts();

    allUrls.push(
      ...products
        .filter((product) => !product.seo.noindex)
        .map((product) =>
          mapSitemapEntry({
            path: product.path,
            modified: product.modified,
            changeFrequency: "weekly",
            priority: 0.7,
          }),
        ),
    );
  } catch (error) {
    console.error("Failed to build door product sitemap entries", error);
  }

  try {
    const wallPanelsPage = await getWallPanelsPageContent();

    if (!wallPanelsPage.seoNoindex) {
      allUrls.push(
        mapSitemapEntry({
          path: wallPanelsPage.path,
          modified: wallPanelsPage.modified,
          changeFrequency: "weekly",
          priority: 0.8,
        }),
      );
    }

    const wallPanelProducts = await getWallPanelProductsByIds(wallPanelsPage.productIds);

    allUrls.push(
      ...wallPanelProducts
        .filter((product) => !product.seo.noindex)
        .map((product) =>
          mapSitemapEntry({
            path: product.path,
            modified: product.modified,
            changeFrequency: "weekly",
            priority: 0.65,
          }),
        ),
    );
  } catch (error) {
    console.error("Failed to build wall panel sitemap entries", error);
  }

  try {
    const wpEntries = await getWpContentSitemapEntries();
    allUrls.push(
      ...wpEntries.map((entry) =>
        mapSitemapEntry({
          path: entry.path,
          modified: entry.modified,
          changeFrequency: "weekly",
          priority: 0.6,
        }),
      ),
    );
  } catch (error) {
    console.error("Failed to build WP content sitemap entries", error);
  }

  return dedupeSitemapEntries(allUrls);
}
