// src/lib/seo/site.ts

import type { Metadata } from "next";
import { hasActiveCatalogFilters } from "@src/lib/woo/catalog-filters";
import type {
    CatalogActiveFilters,
    DoorCatalogAttributes,
    DoorProductDetails,
    DoorRouteCategory,
} from "@src/lib/woo/types";

export const SITE_NAME = "Офисные двери";
export const DEFAULT_SITE_ORIGIN = "http://localhost:3000";

export type DoorCategorySeo = {
    title: string;
    description: string;
    path: string;
};

type BreadcrumbItem = {
    name: string;
    path: string;
};

type JsonLdValue = string | number | boolean | null | JsonLdValue[] | { [key: string]: JsonLdValue };

type JsonLdObject = Record<string, JsonLdValue>;

type BuildMetadataArgs = {
    title: string;
    description: string;
    path: string;
    index?: boolean;
    image?: string | null;
};

function normalizeOrigin(value: string | undefined): string {
    if (!value || value.trim() === "") return DEFAULT_SITE_ORIGIN;

    try {
        const url = new URL(value.trim());
        return url.origin;
    } catch {
        return DEFAULT_SITE_ORIGIN;
    }
}

function normalizePath(path: string): string {
    if (!path || path === "/") return "/";
    return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

function buildTitle(title: string): string {
    return title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
}

function compactObject<T extends Record<string, unknown>>(value: T): T {
    return Object.fromEntries(
        Object.entries(value).filter(([, entryValue]) => entryValue !== undefined && entryValue !== null && entryValue !== ""),
    ) as T;
}

function stripHtml(value: string | null | undefined): string {
    if (!value) return "";

    return value
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function joinAttribute(values?: string[]): string | null {
    if (!values || values.length === 0) return null;
    return values.filter(Boolean).join(", ") || null;
}

function getFirstExistingAttribute(attributes: DoorCatalogAttributes, keys: Array<keyof DoorCatalogAttributes>): string | null {
    for (const key of keys) {
        const value = joinAttribute(attributes[key]);
        if (value) return value;
    }

    return null;
}

export function getSiteOrigin(): string {
    return normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL);
}

export function buildAbsoluteUrl(path: string): string {
    return new URL(normalizePath(path), getSiteOrigin()).toString();
}

export function buildMetadataBase(): URL {
    return new URL(getSiteOrigin());
}

export function buildSeoMetadata({
                                     title,
                                     description,
                                     path,
                                     index = true,
                                     image,
                                 }: BuildMetadataArgs): Metadata {
    const absoluteUrl = buildAbsoluteUrl(path);
    const fullTitle = buildTitle(title);

    return {
        title,
        description,
        alternates: {
            canonical: absoluteUrl,
        },
        robots: {
            index,
            follow: true,
        },
        openGraph: {
            title: fullTitle,
            description,
            url: absoluteUrl,
            siteName: SITE_NAME,
            locale: "ru_RU",
            type: "website",
            images: image ? [{ url: image, alt: title }] : undefined,
        },
    };
}

export function shouldIndexCatalogPage(filters: CatalogActiveFilters): boolean {
    return !hasActiveCatalogFilters(filters);
}

export function getDoorCategorySeo(routeCategory?: DoorRouteCategory): DoorCategorySeo {
    if (routeCategory === "skrytye") {
        return {
            title: "Скрытые межкомнатные двери",
            description: "Каталог скрытых межкомнатных дверей из WooCommerce: размеры, цвета, характеристики, комплектация и заказ без онлайн-оплаты.",
            path: "/mezhkomnatnye-dveri/skrytye",
        };
    }

    if (routeCategory === "protivopozharnye") {
        return {
            title: "Противопожарные межкомнатные двери",
            description: "Каталог противопожарных межкомнатных дверей из WooCommerce: характеристики, огнестойкость, комплектация и заказ без онлайн-оплаты.",
            path: "/mezhkomnatnye-dveri/protivopozharnye",
        };
    }

    return {
        title: "Межкомнатные двери",
        description: "Каталог межкомнатных дверей из WooCommerce: реальные товары, характеристики, фурнитура, комплектация и оформление заказа без онлайн-оплаты.",
        path: "/mezhkomnatnye-dveri",
    };
}

export function buildDoorCategoryMetadata(routeCategory: DoorRouteCategory | undefined, filters: CatalogActiveFilters): Metadata {
    const seo = getDoorCategorySeo(routeCategory);
    const index = shouldIndexCatalogPage(filters);

    return buildSeoMetadata({
        title: seo.title,
        description: seo.description,
        path: seo.path,
        index,
    });
}

export function buildDoorProductSeoDescription(product: DoorProductDetails): string {
    const color = joinAttribute(product.attributes.color);
    const size = joinAttribute(product.attributes.size);
    const material = joinAttribute(product.attributes.material);
    const leafCount = joinAttribute(product.attributes.leafCount);
    const category = product.categories[0]?.name ?? "межкомнатная дверь";

    const details = [category, color, size, material, leafCount]
        .filter(Boolean)
        .join(", ");

    const skuPart = product.sku ? ` SKU ${product.sku}.` : "";
    const parsedPrice = product.price ? Number(product.price.replace(",", ".")) : null;
    const pricePart = parsedPrice !== null && Number.isFinite(parsedPrice)
        ? ` Цена: ${new Intl.NumberFormat("ru-RU").format(parsedPrice)} ₽.`
        : "";

    return `${product.name}: ${details || "характеристики и комплектация"}.${skuPart}${pricePart} Заказ двери с фурнитурой через корзину без онлайн-оплаты.`;
}

export function buildDoorProductMetadata(product: DoorProductDetails): Metadata {
    return buildSeoMetadata({
        title: product.name,
        description: buildDoorProductSeoDescription(product),
        path: product.path,
        index: true,
        image: product.image,
    });
}

export function getDoorCategoryBreadcrumbItems(routeCategory?: DoorRouteCategory): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [
        { name: "Главная", path: "/" },
        { name: "Межкомнатные двери", path: "/mezhkomnatnye-dveri" },
    ];

    if (routeCategory === "skrytye") {
        items.push({ name: "Скрытые двери", path: "/mezhkomnatnye-dveri/skrytye" });
    }

    if (routeCategory === "protivopozharnye") {
        items.push({ name: "Противопожарные двери", path: "/mezhkomnatnye-dveri/protivopozharnye" });
    }

    return items;
}

export function getDoorProductBreadcrumbItems(product: DoorProductDetails): BreadcrumbItem[] {
    const category: DoorRouteCategory | undefined = product.categorySlugs.includes("skrytye-dveri")
        ? "skrytye"
        : product.categorySlugs.includes("protivopozharnye-dveri")
            ? "protivopozharnye"
            : undefined;

    return [
        ...getDoorCategoryBreadcrumbItems(category),
        { name: product.name, path: product.path },
    ];
}

export function buildBreadcrumbListJsonLd(items: BreadcrumbItem[]): JsonLdObject {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: buildAbsoluteUrl(item.path),
        })),
    };
}

function buildProductAdditionalProperties(product: DoorProductDetails): JsonLdObject[] {
    const propertyMap: Array<[string, string | null]> = [
        ["Цвет", joinAttribute(product.attributes.color)],
        ["Размер", joinAttribute(product.attributes.size)],
        ["Количество полотен", joinAttribute(product.attributes.leafCount)],
        ["Материал", joinAttribute(product.attributes.material)],
        ["Остекление", joinAttribute(product.attributes.glazing)],
        ["Тип открывания", joinAttribute(product.attributes.openingType)],
        ["Назначение", joinAttribute(product.attributes.purpose)],
        ["Направление открывания", joinAttribute(product.attributes.openingDirection)],
        ["Огнестойкость", joinAttribute(product.attributes.fireResistance)],
        ["Тип остекления", joinAttribute(product.attributes.glazingType)],
    ];

    return propertyMap
        .filter(([, value]) => Boolean(value))
        .map(([name, value]) => ({
            "@type": "PropertyValue",
            name,
            value: value as string,
        }));
}

export function buildDoorProductJsonLd(product: DoorProductDetails): JsonLdObject {
    const category = getFirstExistingAttribute(product.attributes, ["purpose"])
        || product.categories.map((item) => item.name).join(" / ")
        || "Межкомнатные двери";

    const description = stripHtml(product.shortDescriptionHtml)
        || stripHtml(product.descriptionHtml)
        || buildDoorProductSeoDescription(product);

    const price = product.price ? Number(product.price.replace(",", ".")) : null;
    const hasValidPrice = price !== null && Number.isFinite(price);

    return compactObject({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        sku: product.sku || null,
        productID: String(product.id),
        image: product.gallery.length > 0 ? product.gallery.map((image) => image.src) : product.image ? [product.image] : null,
        description,
        category,
        url: buildAbsoluteUrl(product.path),
        brand: {
            "@type": "Brand",
            name: SITE_NAME,
        },
        additionalProperty: buildProductAdditionalProperties(product),
        offers: hasValidPrice
            ? {
                "@type": "Offer",
                url: buildAbsoluteUrl(product.path),
                priceCurrency: "RUB",
                price: String(price),
                availability: product.stockStatus === "outofstock"
                    ? "https://schema.org/OutOfStock"
                    : "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition",
            }
            : null,
    });
}

export function serializeJsonLd(value: JsonLdObject): string {
    return JSON.stringify(value).replace(/</g, "\\u003c");
}
