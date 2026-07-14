// src/lib/woo/products.ts

import { wooGetList } from "@src/lib/woo/client";
import {
    buildCatalogFilterGroups,
    catalogItemMatchesActiveFilters,
} from "@src/lib/woo/catalog-filters";
import type {
    CatalogActiveFilters,
    CatalogProductCard,
    CatalogResult,
    CatalogType,
    DoorAccessoryCard,
    DoorCatalogAttributes,
    DoorCategoryInfo,
    DoorCategoryNode,
    DoorFamilyInfo,
    DoorFamilySibling,
    DoorFeedProduct,
    DoorOptionChoice,
    DoorOrderOptions,
    DoorProductDetails,
    DoorRouteCategory,
    WooMetaDataItem,
    WooProduct,
    WooProductCategoryTerm,
} from "@src/lib/woo/types";

const ROOT_CATEGORY_BY_TYPE: Record<CatalogType, string> = {
    doors: "mezhkomnatnye-dveri",
    panels: "stenovye-paneli",
};

const DOOR_ROOT_CATEGORY_SLUG = ROOT_CATEGORY_BY_TYPE.doors;

const WOO_CATEGORY_SLUG_TO_ROUTE_SLUG_ALIAS: Record<string, string> = {
    "skrytye-dveri": "skrytye",
    "protivopozharnye-dveri": "protivopozharnye",
};

const PRODUCT_CATEGORIES_CACHE_TTL_MS = 5 * 60 * 1000;
const PRODUCT_BY_IDS_CACHE_TTL_MS = 60 * 1000;

type TimedPromiseCacheItem<T> = {
    expiresAt: number;
    promise: Promise<T>;
};

let allProductCategoriesCache: TimedPromiseCacheItem<WooProductCategoryTerm[]> | null = null;
const productsByIdsCache = new Map<string, TimedPromiseCacheItem<WooProduct[]>>();

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

type DoorRouteContext = {
    categories: WooProductCategoryTerm[];
    rootCategory: WooProductCategoryTerm;
    categoryTree: DoorCategoryNode;
    flatCategoryNodes: DoorCategoryNode[];
};

// -----------------------------------------------------
// Чтение meta_data из Woo.
// ACF-поля в текущих ответах приходят именно как Woo meta_data,
// поэтому сначала приводим их к безопасным string/number/boolean/number[].
// -----------------------------------------------------

function getMetaValue(metaData: WooMetaDataItem[] | undefined, key: string): unknown {
    if (!metaData || metaData.length === 0) return null;
    const item = metaData.find((entry) => entry.key === key);
    return item?.value ?? null;
}

function getMetaValueByKeys(metaData: WooMetaDataItem[] | undefined, keys: string[]): unknown {
    for (const key of keys) {
        const value = getMetaValue(metaData, key);
        if (value !== null && value !== undefined && value !== "") return value;
    }
    return null;
}

function getMetaStringByKeys(metaData: WooMetaDataItem[] | undefined, keys: string[]): string | null {
    const value = getMetaValueByKeys(metaData, keys);
    if (typeof value === "string" && value.trim() !== "") return value;
    if (typeof value === "number") return String(value);
    return null;
}

function getMetaNumberByKeys(metaData: WooMetaDataItem[] | undefined, keys: string[], fallback = 0): number {
    const value = getMetaValueByKeys(metaData, keys);

    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
        const parsed = Number(value.replace(",", ".").trim());
        if (Number.isFinite(parsed)) return parsed;
    }

    return fallback;
}

function getMetaBooleanByKeys(metaData: WooMetaDataItem[] | undefined, keys: string[], fallback = false): boolean {
    const value = getMetaValueByKeys(metaData, keys);

    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value === 1;

    if (typeof value === "string") {
        const normalized = value.trim().toLowerCase();
        if (["1", "true", "yes", "on"].includes(normalized)) return true;
        if (["0", "false", "no", "off"].includes(normalized)) return false;
    }

    return fallback;
}

function getMetaNumberArrayByKeys(metaData: WooMetaDataItem[] | undefined, keys: string[]): number[] {
    const value = getMetaValueByKeys(metaData, keys);

    if (Array.isArray(value)) {
        return value
            .map((item) => Number(item))
            .filter((item) => Number.isInteger(item) && item > 0);
    }

    if (typeof value === "number" && Number.isInteger(value) && value > 0) return [value];

    if (typeof value === "string" && value.trim() !== "") {
        return value
            .split(",")
            .map((item) => Number(item.trim()))
            .filter((item) => Number.isInteger(item) && item > 0);
    }

    return [];
}

// -----------------------------------------------------
// Чтение глобальных Woo attributes.
// Это SEO-значимые характеристики двери, а не опции заказа.
// -----------------------------------------------------

function cleanOptions(values: string[] | undefined): string[] | undefined {
    if (!values || values.length === 0) return undefined;
    const cleaned = values.map((item) => item.trim()).filter(Boolean);
    return cleaned.length > 0 ? cleaned : undefined;
}

function getAttributeOptionsBySlugs(product: WooProduct, possibleSlugs: string[]): string[] | undefined {
    const attribute = product.attributes.find((item) => possibleSlugs.includes(item.slug));
    return attribute ? cleanOptions(attribute.options) : undefined;
}

function getDoorColor(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_tsvet-dveri", "tsvet-dveri"]);
}

function getDoorSize(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_razmer-dveri", "razmer-dveri"]);
}

function getLeafCount(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_kolichestvo-poloten", "kolichestvo-poloten"]);
}

function getOpeningDirection(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_napravlenie-otkryvaniya", "napravlenie-otkryvaniya"]);
}

function getFireResistance(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_ognestoykost", "ognestoykost"]);
}

function getMaterial(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_material-dveri", "material-dveri"]);
}

function getGlazing(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_osteklenie", "osteklenie"]);
}

function getOpeningType(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_tip-otkryvaniya", "tip-otkryvaniya"]);
}

function getGlazingType(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_tip-ostekleniya", "tip-ostekleniya"]);
}

function getPurpose(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_naznachenie", "naznachenie"]);
}

function mapDoorAttributes(product: WooProduct): DoorCatalogAttributes {
    return {
        color: getDoorColor(product),
        size: getDoorSize(product),
        leafCount: getLeafCount(product),
        openingDirection: getOpeningDirection(product),
        fireResistance: getFireResistance(product),
        material: getMaterial(product),
        glazing: getGlazing(product),
        openingType: getOpeningType(product),
        glazingType: getGlazingType(product),
        purpose: getPurpose(product),
    };
}

function normalizeMediaUrl(url: string | undefined): string | null {
    if (!url) return null;

    try {
        return encodeURI(url);
    } catch {
        return url;
    }
}

function getCardImage(product: WooProduct): string | null {
    return normalizeMediaUrl(product.images[0]?.src);
}

function getPublicArticleNo(product: WooProduct): string | null {
    if (typeof product.public_article_no === "string" && product.public_article_no.trim() !== "") {
        return product.public_article_no;
    }

    return getMetaStringByKeys(product.meta_data, ["public_article_no"]);
}

function getHtmlOrNull(value: string | undefined): string | null {
    return value && value.trim() !== "" ? value : null;
}

function normalizeCategoryDescription(value: string | undefined): string | null {
    const cleaned = value?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return cleaned || null;
}

function trimDoorCategorySuffix(slug: string): string {
    return slug.endsWith("-dveri") ? slug.slice(0, -"-dveri".length) : slug;
}

function buildDoorRouteSlugFromWooCategorySlug(slug: string): string {
    return WOO_CATEGORY_SLUG_TO_ROUTE_SLUG_ALIAS[slug] ?? trimDoorCategorySuffix(slug);
}

function buildDoorCategoryPathFromSegments(routeSegments: string[]): string {
    if (routeSegments.length === 0) return "/mezhkomnatnye-dveri";
    return `/mezhkomnatnye-dveri/${routeSegments.join("/")}`;
}

export function buildDoorCategoryPath(routeCategory?: DoorRouteCategory | null): string {
    if (!routeCategory) return "/mezhkomnatnye-dveri";
    return buildDoorCategoryPathFromSegments([routeCategory]);
}

function mapDoorCategoryInfo(category: WooProductCategoryTerm, routeSegments: string[]): DoorCategoryInfo {
    const routeSlug = routeSegments[routeSegments.length - 1] ?? buildDoorRouteSlugFromWooCategorySlug(category.slug);

    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        routeSlug,
        path: buildDoorCategoryPathFromSegments(routeSegments),
        description: normalizeCategoryDescription(category.description),
        image: normalizeMediaUrl(category.image?.src),
        count: category.count ?? 0,
    };
}

function sortCategoriesForNavigation(items: WooProductCategoryTerm[]): WooProductCategoryTerm[] {
    return [...items].sort((a, b) => {
        const orderA = a.menu_order ?? 0;
        const orderB = b.menu_order ?? 0;

        if (orderA !== orderB) return orderA - orderB;
        return a.name.localeCompare(b.name, "ru");
    });
}

function buildDoorCategoryNode(
    category: WooProductCategoryTerm,
    categories: WooProductCategoryTerm[],
    routeSegments: string[],
): DoorCategoryNode {
    const directChildren = sortCategoriesForNavigation(categories.filter((item) => item.parent === category.id));

    return {
        ...mapDoorCategoryInfo(category, routeSegments),
        children: directChildren.map((child) => buildDoorCategoryNode(
            child,
            categories,
            [...routeSegments, buildDoorRouteSlugFromWooCategorySlug(child.slug)],
        )),
    };
}

function buildDoorCategoryTree(categories: WooProductCategoryTerm[], rootCategory: WooProductCategoryTerm): DoorCategoryNode {
    return buildDoorCategoryNode(rootCategory, categories, []);
}

function flattenDoorCategoryTree(root: DoorCategoryNode): DoorCategoryNode[] {
    return [root, ...root.children.flatMap((child) => flattenDoorCategoryTree(child))];
}

function createDoorRouteContext(
    categories: WooProductCategoryTerm[],
    rootCategory: WooProductCategoryTerm,
): DoorRouteContext {
    const categoryTree = buildDoorCategoryTree(categories, rootCategory);

    return {
        categories,
        rootCategory,
        categoryTree,
        flatCategoryNodes: flattenDoorCategoryTree(categoryTree),
    };
}

function findDoorCategoryNodeByWooSlug(context: DoorRouteContext, wooCategorySlug: string): DoorCategoryNode | null {
    return context.flatCategoryNodes.find((category) => category.slug === wooCategorySlug) ?? null;
}

function findDoorCategoryNodeByRouteSegments(root: DoorCategoryNode, routeSegments: string[]): DoorCategoryNode | null {
    if (routeSegments.length === 0) return root;

    let current: DoorCategoryNode = root;

    for (const segment of routeSegments) {
        const next = current.children.find((child) => child.routeSlug === segment);
        if (!next) return null;
        current = next;
    }

    return current;
}

function findDoorCategoryNodeBySlugOrRouteValue(context: DoorRouteContext, value: string): DoorCategoryNode | null {
    if (value === context.rootCategory.slug) return context.categoryTree;

    return context.flatCategoryNodes.find((category) => (
        category.slug === value || category.routeSlug === value || category.path === buildDoorCategoryPath(value)
    )) ?? null;
}

function categoryBelongsToRootTree(context: DoorRouteContext, categoryId: number): boolean {
    return context.flatCategoryNodes.some((category) => category.id === categoryId);
}

function getCategoryDepth(categoriesById: Map<number, WooProductCategoryTerm>, rootId: number, categoryId: number): number {
    let depth = 0;
    let current = categoriesById.get(categoryId);

    while (current && current.id !== rootId && current.parent !== 0) {
        depth += 1;
        current = categoriesById.get(current.parent);
    }

    return depth;
}

function getPreferredDoorCategoryNodeForProduct(product: WooProduct, context: DoorRouteContext): DoorCategoryNode | null {
    const categoriesById = new Map(context.categories.map((category) => [category.id, category]));
    const productCategoryIds = new Set(product.categories.map((category) => category.id));

    return context.flatCategoryNodes
        .filter((category) => category.id !== context.rootCategory.id)
        .filter((category) => productCategoryIds.has(category.id))
        .sort((a, b) => {
            const depthDiff = getCategoryDepth(categoriesById, context.rootCategory.id, b.id)
                - getCategoryDepth(categoriesById, context.rootCategory.id, a.id);

            if (depthDiff !== 0) return depthDiff;
            return a.name.localeCompare(b.name, "ru");
        })[0] ?? null;
}

export function getDoorCategoryLabelByRouteCategory(routeCategory?: DoorRouteCategory): string {
    if (routeCategory === "skrytye") return "Скрытые двери";
    if (routeCategory === "protivopozharnye") return "Противопожарные двери";
    if (!routeCategory) return "Межкомнатные двери";

    return routeCategory
        .split("-")
        .filter(Boolean)
        .map((part) => part[0]?.toUpperCase() + part.slice(1))
        .join(" ");
}

export function getDoorTypeLabel(categorySlugs: string[]): string {
    if (categorySlugs.includes("skrytye-dveri")) return "Скрытая";
    if (categorySlugs.includes("protivopozharnye-dveri")) return "Противопожарная";
    return "Межкомнатная";
}

export function buildDoorProductPath({
                                         slug,
                                         routeCategoryPath,
                                     }: {
    slug: string;
    categorySlugs?: string[];
    routeCategoryPath?: string | null;
}): string {
    if (routeCategoryPath) {
        return `${routeCategoryPath}/${slug}`;
    }

    return `/mezhkomnatnye-dveri/${slug}`;
}

function mapCatalogProductCard(product: WooProduct, routeContext?: DoorRouteContext): CatalogProductCard {
    const categorySlugs = product.categories.map((category) => category.slug);
    const preferredCategory = routeContext ? getPreferredDoorCategoryNodeForProduct(product, routeContext) : null;

    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        sku: product.sku ?? "",
        publicArticleNo: getPublicArticleNo(product),
        price: product.price ? product.price : null,
        image: getCardImage(product),
        categorySlugs,
        attributes: mapDoorAttributes(product),
        path: buildDoorProductPath({ slug: product.slug, categorySlugs, routeCategoryPath: preferredCategory?.path }),
    };
}

// -----------------------------------------------------
// Нормализация ACF/post meta опций заказа.
// Поддерживаем реальные ключи из Woo REST и несколько старых опечаток,
// чтобы текущие демо-товары не ломали карточку.
// -----------------------------------------------------

function parseSelectValue(value: string | null, fallbackId: string): { id: string; label: string } {
    if (!value) return { id: fallbackId, label: fallbackId };

    const [rawId, ...labelParts] = value.split(":");
    const id = rawId.trim() || fallbackId;
    const label = labelParts.join(":").trim() || id;

    return { id, label };
}

function createChoice({
                          id,
                          label,
                          enabled,
                          priceDelta,
                          defaultOptionId,
                      }: {
    id: string;
    label: string;
    enabled: boolean;
    priceDelta: number;
    defaultOptionId: string;
}): DoorOptionChoice {
    return {
        id,
        label,
        enabled,
        priceDelta,
        isDefault: id === defaultOptionId,
    };
}

function normalizeDefaultOptionId(metaData: WooMetaDataItem[], keys: string[], fallbackId: string): string {
    const value = getMetaStringByKeys(metaData, keys);
    return parseSelectValue(value, fallbackId).id;
}

export function mapDoorOrderOptions(product: WooProduct): DoorOrderOptions {
    const metaData = product.meta_data;

    const boxDefaultOptionId = normalizeDefaultOptionId(
        metaData,
        ["configurator_box_default_option", "box_default_option"],
        "none",
    );
    const openingSideDefaultOptionId = normalizeDefaultOptionId(
        metaData,
        [
            "configurator_opening_side_default_option",
            "configurator_opening_side_default_options",
            "configurator_opening_side",
            "opening_side_default_option",
        ],
        "any",
    );
    const soundproofingDefaultOptionId = normalizeDefaultOptionId(
        metaData,
        ["configurator_soundproofing_default_option", "configurator_sound_insulation", "soundproofing_default_option"],
        "base",
    );
    const thresholdDefaultOptionId = normalizeDefaultOptionId(
        metaData,
        ["configurator_slide_threshold_default_option", "configurator_slide_threshold_defoult_option", "slide_threshold_default_option"],
        "none",
    );

    return {
        box: {
            key: "box",
            title: "Дверная коробка",
            defaultOptionId: boxDefaultOptionId,
            choices: [
                createChoice({
                    id: "none",
                    label: "Без коробки",
                    enabled: getMetaBooleanByKeys(metaData, ["configurator_box_none_enabled", "box_none_enabled"], true),
                    priceDelta: 0,
                    defaultOptionId: boxDefaultOptionId,
                }),
                createChoice({
                    id: "std_wood",
                    label: "Стандартная деревянная коробка",
                    enabled: getMetaBooleanByKeys(metaData, ["configurator_box_std_enabled", "box_std_enabled"]),
                    priceDelta: getMetaNumberByKeys(metaData, ["configurator_box_std_price_delta", "box_std_price_delta"]),
                    defaultOptionId: boxDefaultOptionId,
                }),
                createChoice({
                    id: "aluminium",
                    label: "Алюминиевая коробка",
                    enabled: getMetaBooleanByKeys(metaData, ["configurator_box_aluminium_enabled", "box_aluminium_enabled"]),
                    priceDelta: getMetaNumberByKeys(metaData, ["configurator_box_aluminium_price_delta", "box_aluminium_price_delta"]),
                    defaultOptionId: boxDefaultOptionId,
                }),
                createChoice({
                    id: "telescopic",
                    label: "Телескопическая коробка",
                    enabled: getMetaBooleanByKeys(metaData, ["configurator_box_telescopic_enabled", "box_telescopic_enabled"]),
                    priceDelta: getMetaNumberByKeys(metaData, ["configurator_box_telescopic_price_delta", "box_telescopic_price_delta"]),
                    defaultOptionId: boxDefaultOptionId,
                }),
            ],
        },
        openingSide: {
            key: "openingSide",
            title: "Сторона открывания",
            defaultOptionId: openingSideDefaultOptionId,
            choices: [
                createChoice({ id: "any", label: "Любое (без фрезеровки)", enabled: true, priceDelta: 0, defaultOptionId: openingSideDefaultOptionId }),
                createChoice({
                    id: "right",
                    label: "Правая",
                    enabled: true,
                    priceDelta: getMetaNumberByKeys(metaData, ["configurator_opening_side_right_price_delta", "opening_side_right_price_delta"]),
                    defaultOptionId: openingSideDefaultOptionId,
                }),
                createChoice({
                    id: "left",
                    label: "Левая",
                    enabled: true,
                    priceDelta: getMetaNumberByKeys(metaData, ["configurator_opening_side_left_price_delta", "opening_side_left_price_delta"]),
                    defaultOptionId: openingSideDefaultOptionId,
                }),
            ],
        },
        soundproofing: {
            key: "soundproofing",
            title: "Шумоизоляция",
            defaultOptionId: soundproofingDefaultOptionId,
            choices: [
                createChoice({ id: "base", label: "Базовый вариант ≥48 дБ", enabled: true, priceDelta: 0, defaultOptionId: soundproofingDefaultOptionId }),
                createChoice({
                    id: "plus",
                    label: "Шумоизоляция Plus",
                    enabled: getMetaBooleanByKeys(metaData, ["configurator_soundproofing_plus_enabled", "soundproofing_plus_enabled"]),
                    priceDelta: getMetaNumberByKeys(metaData, ["configurator_soundproofing_plus_price_delta", "soundproofing_plus_price_delta"]),
                    defaultOptionId: soundproofingDefaultOptionId,
                }),
                createChoice({
                    id: "premium",
                    label: "Шумоизоляция Premium",
                    enabled: getMetaBooleanByKeys(metaData, ["configurator_soundproofing_premium_enabled", "soundproofing_premium_enabled"]),
                    priceDelta: getMetaNumberByKeys(metaData, [
                        "configurator_soundproofing_premium_price_delta",
                        "configurator_soundproofing_premium_prive_delta",
                        "configurator_soundproofing_premium_prise_delta",
                        "soundproofing_premium_price_delta",
                    ]),
                    defaultOptionId: soundproofingDefaultOptionId,
                }),
            ],
        },
        threshold: {
            key: "threshold",
            title: "Выдвижной порожек",
            defaultOptionId: thresholdDefaultOptionId,
            choices: [
                createChoice({ id: "none", label: "Без порожка", enabled: true, priceDelta: 0, defaultOptionId: thresholdDefaultOptionId }),
                createChoice({
                    id: "plus",
                    label: "С порожком",
                    enabled: getMetaBooleanByKeys(metaData, ["configurator_slide_threshold_enabled", "slide_threshold_enabled"]),
                    priceDelta: getMetaNumberByKeys(metaData, ["configurator_slide_threshold_price_delta", "slide_threshold_price_delta"]),
                    defaultOptionId: thresholdDefaultOptionId,
                }),
            ],
        },
    };
}

function getDoorFamilyCode(product: WooProduct): string | null {
    return getMetaStringByKeys(product.meta_data, ["door_family", "family_code"]);
}

function normalizeFamilyCode(value: string | null): string | null {
    if (!value) return null;

    const normalized = value.trim().toLowerCase();
    return normalized === "" ? null : normalized;
}

function mapDoorFamilySibling(product: WooProduct, currentProductId: number, routeContext: DoorRouteContext): DoorFamilySibling {
    const card = mapCatalogProductCard(product, routeContext);

    return {
        id: card.id,
        slug: card.slug,
        name: card.name,
        sku: card.sku,
        path: card.path,
        price: card.price,
        image: card.image,
        attributes: card.attributes,
        isCurrent: card.id === currentProductId,
    };
}

async function getDoorFamilyInfo(
    currentProduct: WooProduct,
    categories: WooProductCategoryTerm[],
    rootCategory: WooProductCategoryTerm,
    routeContext: DoorRouteContext,
): Promise<DoorFamilyInfo> {
    const familyCode = getDoorFamilyCode(currentProduct);
    const normalizedFamilyCode = normalizeFamilyCode(familyCode);

    if (!normalizedFamilyCode) {
        return { code: null, siblings: [] };
    }

    const categoryIds = collectDescendantCategoryIds(categories, rootCategory.id);
    const response = await wooGetList<WooProduct>("products", {
        status: "publish",
        per_page: 100,
        page: 1,
        category: categoryIds.join(","),
        orderby: "date",
        order: "desc",
    }, 60);

    const siblings = response.items
        .filter((product) => normalizeFamilyCode(getDoorFamilyCode(product)) === normalizedFamilyCode)
        .map((product) => mapDoorFamilySibling(product, currentProduct.id, routeContext));

    return { code: familyCode, siblings };
}

// -----------------------------------------------------
// Связанная фурнитура.
// Relationship-поля ACF сейчас приходят в Woo REST как массивы ID в meta_data.
// -----------------------------------------------------

function getRelatedAccessoryIds(product: WooProduct): { handles: number[]; hinges: number[]; locks: number[] } {
    const metaData = product.meta_data;

    return {
        handles: getMetaNumberArrayByKeys(metaData, ["configurator_related_handles", "configurator_related_handless", "related_handles"]),
        hinges: getMetaNumberArrayByKeys(metaData, ["configurator_related_hinges", "related_hinges"]),
        locks: getMetaNumberArrayByKeys(metaData, ["configurator_related_locks", "related_locks"]),
    };
}

async function getProductsByIds(ids: number[]): Promise<WooProduct[]> {
    const uniqueIds = Array.from(new Set(ids)).filter((id) => id > 0);
    if (uniqueIds.length === 0) return [];

    const cacheKey = uniqueIds.sort((a, b) => a - b).join(",");

    return getCachedPromise(productsByIdsCache, cacheKey, PRODUCT_BY_IDS_CACHE_TTL_MS, async () => {
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

function mapAccessoryCard(product: WooProduct): DoorAccessoryCard {
    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        sku: product.sku ?? "",
        publicArticleNo: getPublicArticleNo(product),
        price: product.price ? product.price : null,
        image: getCardImage(product),
        categorySlugs: product.categories.map((category) => category.slug),
        shortLabel: getMetaStringByKeys(product.meta_data, ["addon_configurator_addon_short_label", "addon_short_label"]),
        recommendedQty: getMetaNumberByKeys(product.meta_data, ["addon_configurator_recommended_qty", "recommended_qty"], 1),
        sortOrder: getMetaNumberByKeys(product.meta_data, ["addon_configurator_addon_sort_order", "addon_sort_order"], 0),
        stockStatus: product.stock_status ?? null,
    };
}

function sortAccessories(items: DoorAccessoryCard[]): DoorAccessoryCard[] {
    return [...items].sort((a, b) => (
        a.sortOrder !== b.sortOrder
            ? a.sortOrder - b.sortOrder
            : a.name.localeCompare(b.name, "ru")
    ));
}

async function getRelatedAccessories(product: WooProduct): Promise<DoorProductDetails["accessories"]> {
    const ids = getRelatedAccessoryIds(product);
    const handleIds = new Set(ids.handles);
    const hingeIds = new Set(ids.hinges);
    const lockIds = new Set(ids.locks);
    const allIds = [...handleIds, ...hingeIds, ...lockIds];

    try {
        const products = await getProductsByIds(allIds);

        return {
            handles: sortAccessories(products.filter((item) => handleIds.has(item.id)).map(mapAccessoryCard)),
            hinges: sortAccessories(products.filter((item) => hingeIds.has(item.id)).map(mapAccessoryCard)),
            locks: sortAccessories(products.filter((item) => lockIds.has(item.id)).map(mapAccessoryCard)),
        };
    } catch (error) {
        console.error("Failed to load related accessories for door product:", product.id, error);

        return {
            handles: [],
            hinges: [],
            locks: [],
        };
    }
}

async function mapDoorProductDetails(
    product: WooProduct,
    categories: WooProductCategoryTerm[],
    rootCategory: WooProductCategoryTerm,
    routeContext: DoorRouteContext,
): Promise<DoorProductDetails> {
    const categorySlugs = product.categories.map((category) => category.slug);
    const preferredCategory = getPreferredDoorCategoryNodeForProduct(product, routeContext);

    const [family, accessories] = await Promise.all([
        getDoorFamilyInfo(product, categories, rootCategory, routeContext),
        getRelatedAccessories(product),
    ]);

    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        sku: product.sku ?? "",
        publicArticleNo: getPublicArticleNo(product),
        price: product.price ? product.price : null,
        regularPrice: product.regular_price ? product.regular_price : null,
        salePrice: product.sale_price ? product.sale_price : null,
        stockStatus: product.stock_status ?? null,
        path: buildDoorProductPath({ slug: product.slug, categorySlugs, routeCategoryPath: preferredCategory?.path }),
        image: getCardImage(product),
        gallery: product.images.map((image) => ({
            ...image,
            src: normalizeMediaUrl(image.src) ?? image.src,
        })),
        categories: product.categories,
        categorySlugs,
        routeCategory: preferredCategory,
        shortDescriptionHtml: getHtmlOrNull(product.short_description),
        descriptionHtml: getHtmlOrNull(product.description),
        attributes: mapDoorAttributes(product),
        family,
        orderOptions: mapDoorOrderOptions(product),
        accessories,
    };
}

async function loadAllProductCategories(): Promise<WooProductCategoryTerm[]> {
    const baseParams = {
        per_page: 100,
        hide_empty: false,
    };
    const firstPage = await wooGetList<WooProductCategoryTerm>("products/categories", {
        ...baseParams,
        page: 1,
    }, 300);

    if (firstPage.totalPages <= 1) {
        return firstPage.items;
    }

    const restPages = await Promise.all(
        Array.from({ length: firstPage.totalPages - 1 }, (_, index) => wooGetList<WooProductCategoryTerm>("products/categories", {
            ...baseParams,
            page: index + 2,
        }, 300)),
    );

    return [
        ...firstPage.items,
        ...restPages.flatMap((pageResponse) => pageResponse.items),
    ];
}

async function getAllProductCategories(): Promise<WooProductCategoryTerm[]> {
    const now = Date.now();

    if (allProductCategoriesCache && allProductCategoriesCache.expiresAt > now) {
        return allProductCategoriesCache.promise;
    }

    const promise = loadAllProductCategories().catch((error) => {
        allProductCategoriesCache = null;
        throw error;
    });

    allProductCategoriesCache = {
        expiresAt: now + PRODUCT_CATEGORIES_CACHE_TTL_MS,
        promise,
    };

    return promise;
}

function findCategoryBySlug(categories: WooProductCategoryTerm[], slug: string): WooProductCategoryTerm | undefined {
    return categories.find((category) => category.slug === slug);
}

function collectDescendantCategoryIds(categories: WooProductCategoryTerm[], rootId: number): number[] {
    const result = new Set<number>([rootId]);
    const queue: number[] = [rootId];

    while (queue.length > 0) {
        const currentParentId = queue.shift() as number;
        const children = categories.filter((category) => category.parent === currentParentId);

        for (const child of children) {
            if (result.has(child.id)) continue;

            result.add(child.id);
            queue.push(child.id);
        }
    }

    return Array.from(result);
}

async function getDoorRouteContext(): Promise<DoorRouteContext> {
    const categories = await getAllProductCategories();
    const rootCategory = findCategoryBySlug(categories, DOOR_ROOT_CATEGORY_SLUG);

    if (!rootCategory) {
        throw new Error(`В WooCommerce не найдена категория со slug "${DOOR_ROOT_CATEGORY_SLUG}"`);
    }

    return createDoorRouteContext(categories, rootCategory);
}

async function getCatalogRootCategoryContext(type: CatalogType): Promise<{
    categories: WooProductCategoryTerm[];
    rootCategory: WooProductCategoryTerm;
    doorRouteContext?: DoorRouteContext;
}> {
    const categories = await getAllProductCategories();
    const rootCategorySlug = ROOT_CATEGORY_BY_TYPE[type];
    const rootCategory = findCategoryBySlug(categories, rootCategorySlug);

    if (!rootCategory) {
        throw new Error(`В WooCommerce не найдена категория со slug "${rootCategorySlug}"`);
    }

    return {
        categories,
        rootCategory,
        doorRouteContext: type === "doors" ? createDoorRouteContext(categories, rootCategory) : undefined,
    };
}

function resolveEffectiveCatalogCategory({
                                             categorySlug,
                                             categories,
                                             rootCategory,
                                             doorRouteContext,
                                         }: {
    categorySlug?: string;
    categories: WooProductCategoryTerm[];
    rootCategory: WooProductCategoryTerm;
    doorRouteContext?: DoorRouteContext;
}): { term: WooProductCategoryTerm; doorNode: DoorCategoryNode | null } {
    if (!categorySlug) {
        return { term: rootCategory, doorNode: doorRouteContext?.categoryTree ?? null };
    }

    if (doorRouteContext) {
        const requestedDoorCategory = findDoorCategoryNodeBySlugOrRouteValue(doorRouteContext, categorySlug);

        if (!requestedDoorCategory) {
            throw new Error(`В WooCommerce не найдена категория дверей для route/category slug "${categorySlug}"`);
        }

        const term = findCategoryBySlug(doorRouteContext.categories, requestedDoorCategory.slug);
        if (!term) {
            throw new Error(`В WooCommerce не найдена категория со slug "${requestedDoorCategory.slug}"`);
        }

        return { term, doorNode: requestedDoorCategory };
    }

    // Non-door catalogs still resolve by real Woo slug, but we keep the same
    // subtree protection as for doors.
    const requestedCategory = findCategoryBySlug(categories, categorySlug);

    if (!requestedCategory) {
        throw new Error(`В WooCommerce не найдена категория со slug "${categorySlug}"`);
    }

    const allowedCategoryIds = new Set(collectDescendantCategoryIds(categories, rootCategory.id));

    if (!allowedCategoryIds.has(requestedCategory.id)) {
        throw new Error(`Категория "${requestedCategory.slug}" не принадлежит дереву "${rootCategory.slug}"`);
    }

    return { term: requestedCategory, doorNode: null };
}

async function getAllPublishedProductsInCategoryTree(categoryIds: number[]): Promise<WooProduct[]> {
    const baseParams = {
        status: "publish",
        per_page: 100,
        category: categoryIds.join(","),
        orderby: "date",
        order: "desc",
    };

    const firstPage = await wooGetList<WooProduct>("products", {
        ...baseParams,
        page: 1,
    }, 60);

    if (firstPage.totalPages <= 1) {
        return firstPage.items;
    }

    const restPages = await Promise.all(
        Array.from({ length: firstPage.totalPages - 1 }, (_, index) => wooGetList<WooProduct>("products", {
            ...baseParams,
            page: index + 2,
        }, 60)),
    );

    return [
        ...firstPage.items,
        ...restPages.flatMap((pageResponse) => pageResponse.items),
    ];
}

type GetCatalogProductsArgs = {
    type: CatalogType;
    page?: number;
    perPage?: number;
    categorySlug?: string;
    filters?: CatalogActiveFilters;
};

export async function getCatalogProducts(args: GetCatalogProductsArgs): Promise<CatalogResult> {
    const { type, page = 1, perPage = 24, categorySlug, filters = {} } = args;
    const { categories, rootCategory, doorRouteContext } = await getCatalogRootCategoryContext(type);
    const { term: effectiveCategory, doorNode: currentDoorCategory } = resolveEffectiveCatalogCategory({
        categorySlug,
        categories,
        rootCategory,
        doorRouteContext,
    });

    const categoryIds = doorRouteContext
        ? collectDescendantCategoryIds(categories, effectiveCategory.id).filter((categoryId) => categoryBelongsToRootTree(doorRouteContext, categoryId))
        : collectDescendantCategoryIds(categories, effectiveCategory.id);
    // MVP-решение: для дверей строим facet groups и фильтруем на BFF-слое.
    // Это быстрее, чем сейчас писать отдельный WP tax_query endpoint, но контракт уже отделён
    // от реализации. Позже внутренность можно заменить на серверную фильтрацию Woo/WP
    // без переписывания UI каталога.
    const productsResponse = type === "doors"
        ? {
            items: await getAllPublishedProductsInCategoryTree(categoryIds),
            total: 0,
            totalPages: 1,
        }
        : await wooGetList<WooProduct>("products", {
            status: "publish",
            page,
            per_page: perPage,
            category: categoryIds.join(","),
            orderby: "date",
            order: "desc",
        }, 60);

    const allCards = productsResponse.items.map((product) => mapCatalogProductCard(product, doorRouteContext));
    const filteredCards = type === "doors"
        ? allCards.filter((item) => catalogItemMatchesActiveFilters(item.attributes, filters))
        : allCards;
    const total = type === "doors" ? filteredCards.length : productsResponse.total;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const safePage = Math.min(Math.max(page, 1), totalPages);
    const pageStartIndex = (safePage - 1) * perPage;
    const pageItems = type === "doors"
        ? filteredCards.slice(pageStartIndex, pageStartIndex + perPage)
        : filteredCards;

    return {
        type,
        categorySlug: effectiveCategory.slug,
        page: safePage,
        perPage,
        total,
        totalPages,
        items: pageItems,
        filters: {
            active: type === "doors" ? filters : {},
            groups: type === "doors" ? buildCatalogFilterGroups(allCards, filters) : [],
        },
        categoryTree: doorRouteContext?.categoryTree,
        currentCategory: currentDoorCategory ?? undefined,
    };
}

export async function getDoorSitemapProducts(): Promise<CatalogProductCard[]> {
    const routeContext = await getDoorRouteContext();
    const categoryIds = collectDescendantCategoryIds(routeContext.categories, routeContext.rootCategory.id);
    const products = await getAllPublishedProductsInCategoryTree(categoryIds);

    return products.map((product) => mapCatalogProductCard(product, routeContext));
}

export async function getDoorSitemapCategories(): Promise<DoorCategoryInfo[]> {
    const routeContext = await getDoorRouteContext();

    return routeContext.flatCategoryNodes;
}

function isAddonOnlyProduct(product: WooProduct): boolean {
    return getMetaBooleanByKeys(product.meta_data, [
        "addon_configurator_is_addon_only",
        "addon_is_addon_only",
    ]);
}

function isPrimaryDoorProduct(product: WooProduct, routeContext: DoorRouteContext): boolean {
    if ((product.type ?? "simple") !== "simple") return false;
    if (isAddonOnlyProduct(product)) return false;

    const allowedDoorCategoryIds = new Set(routeContext.flatCategoryNodes.map((category) => category.id));
    return product.categories.some((category) => allowedDoorCategoryIds.has(category.id));
}

export async function getPrimaryRelatedProductsByIds(ids: number[]): Promise<CatalogProductCard[]> {
    const uniqueIds = Array.from(new Set(ids)).filter((id) => Number.isInteger(id) && id > 0);
    if (uniqueIds.length === 0) return [];

    const routeContext = await getDoorRouteContext();
    const products = await getProductsByIds(uniqueIds);

    return products
        .filter((product) => isPrimaryDoorProduct(product, routeContext))
        .map((product) => mapCatalogProductCard(product, routeContext));
}

export async function getPrimaryDoorProductsByIds(ids: number[]): Promise<CatalogProductCard[]> {
    return getPrimaryRelatedProductsByIds(ids);
}

function mapDoorFeedProduct(product: WooProduct, routeContext: DoorRouteContext): DoorFeedProduct {
    const card = mapCatalogProductCard(product, routeContext);
    const preferredCategory = getPreferredDoorCategoryNodeForProduct(product, routeContext);

    return {
        ...card,
        regularPrice: product.regular_price ? product.regular_price : null,
        salePrice: product.sale_price ? product.sale_price : null,
        stockStatus: product.stock_status ?? null,
        categories: product.categories,
        routeCategory: preferredCategory,
        shortDescriptionHtml: getHtmlOrNull(product.short_description),
        descriptionHtml: getHtmlOrNull(product.description),
    };
}

export async function getDoorFeedProducts(): Promise<DoorFeedProduct[]> {
    const routeContext = await getDoorRouteContext();
    const categoryIds = collectDescendantCategoryIds(routeContext.categories, routeContext.rootCategory.id);
    const products = await getAllPublishedProductsInCategoryTree(categoryIds);

    return products
        .filter((product) => (product.type ?? "simple") === "simple")
        .map((product) => mapDoorFeedProduct(product, routeContext));
}

export type DoorRouteResolution =
    | { kind: "category"; category: DoorCategoryInfo; routeCategory: DoorRouteCategory; wooCategorySlug: string }
    | { kind: "product"; slug: string; category?: DoorCategoryInfo; routeCategory?: DoorRouteCategory; wooCategorySlug?: string };

export async function resolveDoorRoute(segments: string[]): Promise<DoorRouteResolution | null> {
    if (segments.length === 0) return null;

    const routeContext = await getDoorRouteContext();
    const categoryNode = findDoorCategoryNodeByRouteSegments(routeContext.categoryTree, segments);

    if (categoryNode && categoryNode.id !== routeContext.rootCategory.id) {
        return {
            kind: "category",
            category: categoryNode,
            routeCategory: categoryNode.routeSlug,
            wooCategorySlug: categoryNode.slug,
        };
    }

    if (segments.length === 1) {
        return { kind: "product", slug: segments[0] };
    }

    const categorySegments = segments.slice(0, -1);
    const productSlug = segments[segments.length - 1];
    const parentCategoryNode = findDoorCategoryNodeByRouteSegments(routeContext.categoryTree, categorySegments);

    if (!parentCategoryNode || parentCategoryNode.id === routeContext.rootCategory.id) return null;

    return {
        kind: "product",
        slug: productSlug,
        category: parentCategoryNode,
        routeCategory: parentCategoryNode.routeSlug,
        wooCategorySlug: parentCategoryNode.slug,
    };
}

type GetDoorProductBySlugArgs = {
    slug: string;
    routeCategory?: DoorRouteCategory;
    wooCategorySlug?: string;
};

export async function getDoorProductBySlug(args: GetDoorProductBySlugArgs): Promise<DoorProductDetails | null> {
    const { slug, routeCategory, wooCategorySlug } = args;
    const routeContext = await getDoorRouteContext();
    const expectedCategory = wooCategorySlug
        ? findDoorCategoryNodeByWooSlug(routeContext, wooCategorySlug)
        : routeCategory
            ? findDoorCategoryNodeBySlugOrRouteValue(routeContext, routeCategory)
            : null;

    if ((wooCategorySlug || routeCategory) && !expectedCategory) return null;

    const allowedDoorCategoryIds = new Set(routeContext.flatCategoryNodes.map((category) => category.id));
    const productsResponse = await wooGetList<WooProduct>("products", {
        status: "publish",
        slug,
        per_page: 20,
        page: 1,
    }, 60);

    const rawProduct = productsResponse.items.find((product) => {
        const belongsToDoorsTree = product.categories.some((category) => allowedDoorCategoryIds.has(category.id));
        if (!belongsToDoorsTree) return false;

        if (!expectedCategory) return true;

        return product.categories.some((category) => category.slug === expectedCategory.slug);
    });

    if (!rawProduct) return null;

    return mapDoorProductDetails(rawProduct, routeContext.categories, routeContext.rootCategory, routeContext);
}
