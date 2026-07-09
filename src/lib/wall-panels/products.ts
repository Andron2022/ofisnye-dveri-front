// src/lib/wall-panels/products.ts

import { stripHtml, truncateText } from "@src/lib/wp/format";
import { wooGetList } from "@src/lib/woo/client";
import type { WooMetaDataItem, WooProduct, WooProductAttribute, WooProductImage } from "@src/lib/woo/types";
import type { WallPanelAttribute, WallPanelImage, WallPanelProduct } from "@src/lib/wall-panels/types";

const WALL_PANEL_ATTRIBUTE_SLUGS = new Set([
    "pa_material-paneli",
    "material-paneli",
    "pa_tsvet-paneli",
    "tsvet-paneli",
]);

const WALL_PANEL_CATEGORY_SLUGS = new Set([
    "stenovye-paneli",
    "stenovye-paneli-na-zakaz",
    "paneli",
]);

const WALL_PANEL_PRODUCTS_CACHE_TTL_MS = 60 * 1000;

type TimedPromiseCacheItem<T> = {
    expiresAt: number;
    promise: Promise<T>;
};

const wallPanelProductsByIdsCache = new Map<string, TimedPromiseCacheItem<WooProduct[]>>();
const wallPanelProductBySlugCache = new Map<string, TimedPromiseCacheItem<WallPanelProduct | null>>();

function getCachedPromise<T>(
    cache: Map<string, TimedPromiseCacheItem<T>>,
    key: string,
    ttlMs: number,
    loader: () => Promise<T>,
): Promise<T> {
    const now = Date.now();
    const cached = cache.get(key);

    if (cached && cached.expiresAt > now) {
        return cached.promise;
    }

    const promise = loader().catch((error) => {
        cache.delete(key);
        throw error;
    });

    cache.set(key, {
        expiresAt: now + ttlMs,
        promise,
    });

    return promise;
}

function normalizeMediaUrl(url: string | undefined): string | null {
    if (!url) return null;

    try {
        return encodeURI(url);
    } catch {
        return url;
    }
}

function normalizeText(value: string | undefined): string {
    return value?.trim() ?? "";
}

function getMetaValue(metaData: WooMetaDataItem[] | undefined, key: string): unknown {
    return metaData?.find((item) => item.key === key)?.value ?? null;
}

function getMetaString(metaData: WooMetaDataItem[] | undefined, key: string): string | null {
    const value = getMetaValue(metaData, key);

    if (typeof value === "string" && value.trim() !== "") return value.trim();
    if (typeof value === "number") return String(value);

    return null;
}

function getPublicArticleNo(product: WooProduct): string | null {
    if (typeof product.public_article_no === "string" && product.public_article_no.trim() !== "") {
        return product.public_article_no.trim();
    }

    return getMetaString(product.meta_data, "public_article_no");
}

function getHtmlOrNull(value: string | undefined): string | null {
    return value && value.trim() !== "" ? value : null;
}

function normalizeImage(image: WooProductImage, fallbackAlt: string): WallPanelImage | null {
    const src = normalizeMediaUrl(image.src);
    if (!src) return null;

    return {
        id: image.id,
        src,
        alt: normalizeText(image.alt) || normalizeText(image.name) || fallbackAlt,
        name: normalizeText(image.name) || undefined,
        thumbnail: normalizeMediaUrl(image.thumbnail) ?? undefined,
    };
}

function normalizeAttribute(attribute: WooProductAttribute): WallPanelAttribute {
    return {
        id: attribute.id,
        name: attribute.name,
        slug: attribute.slug,
        options: attribute.options.map((item) => item.trim()).filter(Boolean),
    };
}

function getAttributeOptions(product: WooProduct, slugs: string[]): string[] {
    return product.attributes
        .filter((attribute) => slugs.includes(attribute.slug))
        .flatMap((attribute) => attribute.options)
        .map((item) => item.trim())
        .filter(Boolean);
}

export function isWallPanelProduct(product: WooProduct): boolean {
    const categoryMatch = product.categories.some((category) => WALL_PANEL_CATEGORY_SLUGS.has(category.slug));
    const attributeMatch = product.attributes.some((attribute) => WALL_PANEL_ATTRIBUTE_SLUGS.has(attribute.slug));

    return categoryMatch || attributeMatch;
}

export function mapWallPanelProduct(product: WooProduct): WallPanelProduct {
    const images = product.images
        .map((image) => normalizeImage(image, product.name))
        .filter((image): image is WallPanelImage => Boolean(image));
    const shortDescriptionHtml = getHtmlOrNull(product.short_description);
    const descriptionHtml = getHtmlOrNull(product.description);
    const shortDescriptionText = truncateText(
        stripHtml(shortDescriptionHtml || descriptionHtml || ""),
        160,
    );

    return {
        id: product.id,
        slug: product.slug,
        path: `/stenovye-paneli/${product.slug}`,
        name: product.name,
        sku: product.sku ?? "",
        publicArticleNo: getPublicArticleNo(product),
        image: images[0]?.src ?? null,
        images,
        shortDescriptionHtml,
        shortDescriptionText,
        descriptionHtml,
        attributes: product.attributes.map(normalizeAttribute),
        material: getAttributeOptions(product, ["pa_material-paneli", "material-paneli"]),
        color: getAttributeOptions(product, ["pa_tsvet-paneli", "tsvet-paneli"]),
    };
}

async function getProductsByIds(ids: number[]): Promise<WooProduct[]> {
    const uniqueIds = Array.from(new Set(ids)).filter((id) => Number.isInteger(id) && id > 0);
    if (uniqueIds.length === 0) return [];

    const cacheKey = uniqueIds.sort((a, b) => a - b).join(",");

    return getCachedPromise(wallPanelProductsByIdsCache, cacheKey, WALL_PANEL_PRODUCTS_CACHE_TTL_MS, async () => {
        const response = await wooGetList<WooProduct>("products", {
            status: "publish",
            include: uniqueIds.join(","),
            per_page: Math.min(uniqueIds.length, 100),
            page: 1,
        }, 60);

        const byId = new Map(response.items.map((product) => [product.id, product]));
        return uniqueIds
            .map((id) => byId.get(id))
            .filter((product): product is WooProduct => Boolean(product));
    });
}

export async function getWallPanelProductsByIds(ids: number[]): Promise<WallPanelProduct[]> {
    const products = await getProductsByIds(ids);

    return products
        .filter(isWallPanelProduct)
        .map(mapWallPanelProduct);
}

export async function getWallPanelProductById(id: number): Promise<WallPanelProduct | null> {
    const products = await getProductsByIds([id]);
    const product = products[0];

    if (!product || !isWallPanelProduct(product)) return null;

    return mapWallPanelProduct(product);
}

export async function getWallPanelProductBySlug(slug: string): Promise<WallPanelProduct | null> {
    const normalizedSlug = slug.trim();
    if (!normalizedSlug) return null;

    return getCachedPromise(wallPanelProductBySlugCache, normalizedSlug, WALL_PANEL_PRODUCTS_CACHE_TTL_MS, async () => {
        const response = await wooGetList<WooProduct>("products", {
            status: "publish",
            slug: normalizedSlug,
            per_page: 20,
            page: 1,
        }, 60);

        const product = response.items.find(isWallPanelProduct);

        return product ? mapWallPanelProduct(product) : null;
    });
}
