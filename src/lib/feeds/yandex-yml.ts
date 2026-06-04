// src/lib/feeds/yandex-yml.ts

import { getDoorFeedProducts, getDoorCategoryLabelByRouteCategory } from "@src/lib/woo/products";
import { buildAbsoluteUrl, getDoorCategorySeo, SITE_NAME } from "@src/lib/seo/site";
import type { DoorCatalogAttributes, DoorFeedProduct, DoorRouteCategory } from "@src/lib/woo/types";

export type YandexFeedTarget = "direct" | "market";

type FeedCategory = {
    id: number;
    name: string;
    routeCategory?: DoorRouteCategory;
    path: string;
    parentId?: number;
};

type FeedCollection = {
    id: string;
    url: string;
    name: string;
    description: string;
    picture: string;
};

const FEED_CURRENCY = "RUB";

const FEED_CATEGORIES: FeedCategory[] = [
    {
        id: 1,
        name: getDoorCategoryLabelByRouteCategory(),
        path: getDoorCategorySeo().path,
    },
    {
        id: 2,
        name: getDoorCategoryLabelByRouteCategory("skrytye"),
        routeCategory: "skrytye",
        path: getDoorCategorySeo("skrytye").path,
        parentId: 1,
    },
    {
        id: 3,
        name: getDoorCategoryLabelByRouteCategory("protivopozharnye"),
        routeCategory: "protivopozharnye",
        path: getDoorCategorySeo("protivopozharnye").path,
        parentId: 1,
    },
];

function escapeXml(value: string | number | boolean): string {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function stripHtml(value: string | null | undefined): string {
    if (!value) return "";

    return value
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
}

function formatYmlDate(date = new Date()): string {
    return date.toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

function normalizePositivePrice(value: string | null | undefined): string | null {
    if (!value) return null;

    const normalized = value.replace(/\s+/g, "").replace(",", ".");
    const parsed = Number(normalized);

    if (!Number.isFinite(parsed) || parsed <= 0) return null;

    return parsed.toFixed(2).replace(/\.00$/, "");
}

function getOldPrice(product: DoorFeedProduct): string | null {
    const price = Number(normalizePositivePrice(product.price));
    const regularPrice = Number(normalizePositivePrice(product.regularPrice));

    if (!Number.isFinite(price) || !Number.isFinite(regularPrice)) return null;
    if (regularPrice <= price) return null;

    return regularPrice.toFixed(2).replace(/\.00$/, "");
}

function joinAttribute(values?: string[]): string | null {
    if (!values || values.length === 0) return null;
    const joined = values.map((value) => value.trim()).filter(Boolean).join(", ");
    return joined || null;
}

function resolveProductCategoryId(product: DoorFeedProduct): number {
    if (product.categorySlugs.includes("skrytye-dveri")) return 2;
    if (product.categorySlugs.includes("protivopozharnye-dveri")) return 3;

    return 1;
}

function buildProductDescription(product: DoorFeedProduct): string {
    const sourceDescription = stripHtml(product.shortDescriptionHtml) || stripHtml(product.descriptionHtml);

    if (sourceDescription) return sourceDescription;

    const details = [
        joinAttribute(product.attributes.color),
        joinAttribute(product.attributes.size),
        joinAttribute(product.attributes.leafCount),
        joinAttribute(product.attributes.material),
        joinAttribute(product.attributes.glazing),
        joinAttribute(product.attributes.openingType),
        joinAttribute(product.attributes.purpose),
        joinAttribute(product.attributes.openingDirection),
        joinAttribute(product.attributes.fireResistance),
        joinAttribute(product.attributes.glazingType),
    ].filter(Boolean);

    return [product.name, ...details].join(". ");
}

function buildOfferId(product: DoorFeedProduct): string | null {
    const sku = product.sku.trim();
    return sku || null;
}

function shouldIncludeProduct(product: DoorFeedProduct): boolean {
    return Boolean(
        buildOfferId(product)
        && normalizePositivePrice(product.price)
        && product.path
        && product.name.trim(),
    );
}

function buildParamTags(attributes: DoorCatalogAttributes): string[] {
    const params: Array<[string, string | null]> = [
        ["Цвет", joinAttribute(attributes.color)],
        ["Размер", joinAttribute(attributes.size)],
        ["Количество полотен", joinAttribute(attributes.leafCount)],
        ["Материал", joinAttribute(attributes.material)],
        ["Остекление", joinAttribute(attributes.glazing)],
        ["Тип открывания", joinAttribute(attributes.openingType)],
        ["Назначение", joinAttribute(attributes.purpose)],
        ["Направление открывания", joinAttribute(attributes.openingDirection)],
        ["Огнестойкость", joinAttribute(attributes.fireResistance)],
        ["Тип остекления", joinAttribute(attributes.glazingType)],
    ];

    return params
        .filter(([, value]) => Boolean(value))
        .map(([name, value]) => `        <param name="${escapeXml(name)}">${escapeXml(value as string)}</param>`);
}

function buildOfferXml(product: DoorFeedProduct): string | null {
    if (!shouldIncludeProduct(product)) return null;

    const offerId = buildOfferId(product) as string;
    const price = normalizePositivePrice(product.price) as string;
    const oldPrice = getOldPrice(product);
    const description = buildProductDescription(product);
    const available = product.stockStatus === "outofstock" ? "false" : "true";
    const picture = product.image;
    const vendorCode = product.publicArticleNo || product.sku;

    return [
        `      <offer id="${escapeXml(offerId)}" available="${available}">`,
        `        <url>${escapeXml(buildAbsoluteUrl(product.path))}</url>`,
        `        <price>${escapeXml(price)}</price>`,
        oldPrice ? `        <oldprice>${escapeXml(oldPrice)}</oldprice>` : null,
        `        <currencyId>${FEED_CURRENCY}</currencyId>`,
        `        <categoryId>${resolveProductCategoryId(product)}</categoryId>`,
        picture ? `        <picture>${escapeXml(picture)}</picture>` : null,
        `        <name>${escapeXml(product.name)}</name>`,
        `        <vendorCode>${escapeXml(vendorCode)}</vendorCode>`,
        description ? `        <description>${escapeXml(description)}</description>` : null,
        `        <sales_notes>${escapeXml("Заказ без онлайн-оплаты. Стоимость доставки и установки уточняет менеджер.")}</sales_notes>`,
        ...buildParamTags(product.attributes),
        "      </offer>",
    ].filter(Boolean).join("\n");
}

function buildCategoriesXml(): string {
    return FEED_CATEGORIES
        .map((category) => {
            const parent = category.parentId ? ` parentId="${category.parentId}"` : "";
            return `      <category id="${category.id}"${parent}>${escapeXml(category.name)}</category>`;
        })
        .join("\n");
}

function productBelongsToRouteCategory(product: DoorFeedProduct, routeCategory?: DoorRouteCategory): boolean {
    if (!routeCategory) return true;
    if (routeCategory === "skrytye") return product.categorySlugs.includes("skrytye-dveri");
    if (routeCategory === "protivopozharnye") return product.categorySlugs.includes("protivopozharnye-dveri");

    return false;
}

function buildCollections(products: DoorFeedProduct[]): FeedCollection[] {
    return FEED_CATEGORIES
        .map((category) => {
            const productWithImage = products.find((product) => productBelongsToRouteCategory(product, category.routeCategory) && product.image);
            const seo = getDoorCategorySeo(category.routeCategory);

            if (!productWithImage?.image) return null;

            return {
                id: `category-${category.id}`,
                url: buildAbsoluteUrl(category.path),
                name: seo.title,
                description: seo.description,
                picture: productWithImage.image,
            };
        })
        .filter((collection): collection is FeedCollection => Boolean(collection));
}

function buildCollectionsXml(products: DoorFeedProduct[]): string | null {
    const collections = buildCollections(products);

    if (collections.length === 0) return null;

    return [
        "    <collections>",
        ...collections.map((collection) => [
            `      <collection id="${escapeXml(collection.id)}">`,
            `        <url>${escapeXml(collection.url)}</url>`,
            `        <picture>${escapeXml(collection.picture)}</picture>`,
            `        <name>${escapeXml(collection.name)}</name>`,
            `        <description>${escapeXml(collection.description)}</description>`,
            "      </collection>",
        ].join("\n")),
        "    </collections>",
    ].join("\n");
}

export async function buildYandexYmlFeed(target: YandexFeedTarget): Promise<string> {
    const products = (await getDoorFeedProducts()).filter(shouldIncludeProduct);
    const offers = products.map(buildOfferXml).filter((offer): offer is string => Boolean(offer));
    const collections = target === "direct" ? buildCollectionsXml(products) : null;

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        `<yml_catalog date="${formatYmlDate()}">`,
        "  <shop>",
        `    <name>${escapeXml(SITE_NAME)}</name>`,
        `    <company>${escapeXml(SITE_NAME)}</company>`,
        `    <url>${escapeXml(buildAbsoluteUrl("/"))}</url>`,
        "    <currencies>",
        `      <currency id="${FEED_CURRENCY}" rate="1"/>`,
        "    </currencies>",
        "    <categories>",
        buildCategoriesXml(),
        "    </categories>",
        "    <offers>",
        offers.join("\n"),
        "    </offers>",
        collections,
        "  </shop>",
        "</yml_catalog>",
    ].filter((line) => line !== null && line !== undefined).join("\n");
}
