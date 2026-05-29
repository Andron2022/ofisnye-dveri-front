// src/lib/woo/products.ts

import { wooGetList } from "@src/lib/woo/client";
import type {
    CatalogProductCard,
    CatalogResult,
    CatalogType,
    DoorAccessoryCard,
    DoorCatalogAttributes,
    DoorFamilyInfo,
    DoorFamilySibling,
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

const DOOR_ROUTE_CATEGORY_TO_WOO_CATEGORY_SLUG: Record<DoorRouteCategory, string> = {
    skrytye: "skrytye-dveri",
    protivopozharnye: "protivopozharnye-dveri",
};

const WOO_CATEGORY_SLUG_TO_DOOR_ROUTE_CATEGORY: Record<string, DoorRouteCategory> = {
    "skrytye-dveri": "skrytye",
    "protivopozharnye-dveri": "protivopozharnye",
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

function getDoorRouteCategoryFromWooCategorySlugs(categorySlugs: string[]): DoorRouteCategory | null {
    for (const slug of categorySlugs) {
        const routeCategory = WOO_CATEGORY_SLUG_TO_DOOR_ROUTE_CATEGORY[slug];
        if (routeCategory) return routeCategory;
    }
    
    return null;
}

export function getDoorCategoryLabelByRouteCategory(routeCategory?: DoorRouteCategory): string {
    if (routeCategory === "skrytye") return "Скрытые двери";
    if (routeCategory === "protivopozharnye") return "Противопожарные двери";
    return "Межкомнатные двери";
}

export function getDoorTypeLabel(categorySlugs: string[]): string {
    const routeCategory = getDoorRouteCategoryFromWooCategorySlugs(categorySlugs);
    
    if (routeCategory === "skrytye") return "Скрытая";
    if (routeCategory === "protivopozharnye") return "Противопожарная";
    return "Межкомнатная";
}

export function buildDoorProductPath({
                                         slug,
                                         categorySlugs,
                                     }: {
    slug: string;
    categorySlugs: string[];
}): string {
    const routeCategory = getDoorRouteCategoryFromWooCategorySlugs(categorySlugs);
    
    if (routeCategory) {
        return `/mezhkomnatnye-dveri/${routeCategory}/${slug}`;
    }
    
    return `/mezhkomnatnye-dveri/${slug}`;
}

function mapCatalogProductCard(product: WooProduct): CatalogProductCard {
    const categorySlugs = product.categories.map((category) => category.slug);
    
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
        path: buildDoorProductPath({ slug: product.slug, categorySlugs }),
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

function mapDoorOrderOptions(product: WooProduct): DoorOrderOptions {
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

function mapDoorFamilySibling(product: WooProduct, currentProductId: number): DoorFamilySibling {
    const card = mapCatalogProductCard(product);
    
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
        .map((product) => mapDoorFamilySibling(product, currentProduct.id));
    
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
    
    const [handles, hinges, locks] = await Promise.all([
        getProductsByIds(ids.handles),
        getProductsByIds(ids.hinges),
        getProductsByIds(ids.locks),
    ]);
    
    return {
        handles: sortAccessories(handles.map(mapAccessoryCard)),
        hinges: sortAccessories(hinges.map(mapAccessoryCard)),
        locks: sortAccessories(locks.map(mapAccessoryCard)),
    };
}

async function mapDoorProductDetails(
    product: WooProduct,
    categories: WooProductCategoryTerm[],
    rootCategory: WooProductCategoryTerm,
): Promise<DoorProductDetails> {
    const categorySlugs = product.categories.map((category) => category.slug);
    
    const [family, accessories] = await Promise.all([
        getDoorFamilyInfo(product, categories, rootCategory),
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
        path: buildDoorProductPath({ slug: product.slug, categorySlugs }),
        image: getCardImage(product),
        gallery: product.images.map((image) => ({
            ...image,
            src: normalizeMediaUrl(image.src) ?? image.src,
        })),
        categories: product.categories,
        categorySlugs,
        shortDescriptionHtml: getHtmlOrNull(product.short_description),
        descriptionHtml: getHtmlOrNull(product.description),
        attributes: mapDoorAttributes(product),
        family,
        orderOptions: mapDoorOrderOptions(product),
        accessories,
    };
}

async function getAllProductCategories(): Promise<WooProductCategoryTerm[]> {
    const response = await wooGetList<WooProductCategoryTerm>("products/categories", {
        per_page: 100,
        page: 1,
        hide_empty: false,
    }, 300);
    
    return response.items;
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

function assertCategoryInsideTree(
    categories: WooProductCategoryTerm[],
    rootCategory: WooProductCategoryTerm,
    requestedCategory: WooProductCategoryTerm,
): void {
    const allowedIds = new Set(collectDescendantCategoryIds(categories, rootCategory.id));
    
    if (!allowedIds.has(requestedCategory.id)) {
        throw new Error(`Категория "${requestedCategory.slug}" не принадлежит дереву "${rootCategory.slug}"`);
    }
}

type GetCatalogProductsArgs = {
    type: CatalogType;
    page?: number;
    perPage?: number;
    categorySlug?: string;
};

export async function getCatalogProducts(args: GetCatalogProductsArgs): Promise<CatalogResult> {
    const { type, page = 1, perPage = 24, categorySlug } = args;
    const rootCategorySlug = ROOT_CATEGORY_BY_TYPE[type];
    
    const categories = await getAllProductCategories();
    const rootCategory = findCategoryBySlug(categories, rootCategorySlug);
    
    if (!rootCategory) {
        throw new Error(`В WooCommerce не найдена категория со slug "${rootCategorySlug}"`);
    }
    
    let effectiveCategory = rootCategory;
    
    if (categorySlug) {
        const requestedCategory = findCategoryBySlug(categories, categorySlug);
        
        if (!requestedCategory) {
            throw new Error(`В WooCommerce не найдена категория со slug "${categorySlug}"`);
        }
        
        assertCategoryInsideTree(categories, rootCategory, requestedCategory);
        effectiveCategory = requestedCategory;
    }
    
    const categoryIds = collectDescendantCategoryIds(categories, effectiveCategory.id);
    const productsResponse = await wooGetList<WooProduct>("products", {
        status: "publish",
        page,
        per_page: perPage,
        category: categoryIds.join(","),
        orderby: "date",
        order: "desc",
    }, 60);
    
    return {
        type,
        categorySlug: effectiveCategory.slug,
        page,
        perPage,
        total: productsResponse.total,
        totalPages: productsResponse.totalPages,
        items: productsResponse.items.map(mapCatalogProductCard),
    };
}

export type DoorRouteResolution =
    | { kind: "category"; routeCategory: DoorRouteCategory; wooCategorySlug: string }
    | { kind: "product"; slug: string; routeCategory?: DoorRouteCategory; wooCategorySlug?: string };

function isDoorRouteCategory(value: string): value is DoorRouteCategory {
    return value === "skrytye" || value === "protivopozharnye";
}

export function resolveDoorRoute(segments: string[]): DoorRouteResolution | null {
    if (segments.length === 0 || segments.length > 2) return null;
    
    if (segments.length === 1) {
        const [firstSegment] = segments;
        
        if (isDoorRouteCategory(firstSegment)) {
            return {
                kind: "category",
                routeCategory: firstSegment,
                wooCategorySlug: DOOR_ROUTE_CATEGORY_TO_WOO_CATEGORY_SLUG[firstSegment],
            };
        }
        
        return { kind: "product", slug: firstSegment };
    }
    
    const [firstSegment, secondSegment] = segments;
    
    if (!isDoorRouteCategory(firstSegment)) return null;
    
    return {
        kind: "product",
        slug: secondSegment,
        routeCategory: firstSegment,
        wooCategorySlug: DOOR_ROUTE_CATEGORY_TO_WOO_CATEGORY_SLUG[firstSegment],
    };
}

type GetDoorProductBySlugArgs = {
    slug: string;
    routeCategory?: DoorRouteCategory;
};

export async function getDoorProductBySlug(args: GetDoorProductBySlugArgs): Promise<DoorProductDetails | null> {
    const { slug, routeCategory } = args;
    
    const categories = await getAllProductCategories();
    const rootCategory = findCategoryBySlug(categories, ROOT_CATEGORY_BY_TYPE.doors);
    
    if (!rootCategory) {
        throw new Error(`В WooCommerce не найдена категория со slug "${ROOT_CATEGORY_BY_TYPE.doors}"`);
    }
    
    const allowedDoorCategoryIds = new Set(collectDescendantCategoryIds(categories, rootCategory.id));
    const productsResponse = await wooGetList<WooProduct>("products", {
        status: "publish",
        slug,
        per_page: 20,
        page: 1,
    }, 60);
    
    const rawProduct = productsResponse.items.find((product) => {
        const belongsToDoorsTree = product.categories.some((category) => allowedDoorCategoryIds.has(category.id));
        if (!belongsToDoorsTree) return false;
        
        if (!routeCategory) return true;
        
        const expectedWooCategorySlug = DOOR_ROUTE_CATEGORY_TO_WOO_CATEGORY_SLUG[routeCategory];
        return product.categories.some((category) => category.slug === expectedWooCategorySlug);
    });
    
    if (!rawProduct) return null;
    
    return mapDoorProductDetails(rawProduct, categories, rootCategory);
}
