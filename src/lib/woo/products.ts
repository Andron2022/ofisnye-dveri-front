// src/lib/woo/products.ts

import { wooGetList } from "@src/lib/woo/client";
import type {
    CatalogProductCard,
    CatalogResult,
    CatalogType,
    DoorCatalogAttributes,
    DoorProductDetails,
    DoorRouteCategory,
    WooMetaDataItem,
    WooProduct,
    WooProductCategoryTerm,
} from "@src/lib/woo/types";

// -----------------------------------------------------
// Этот файл отвечает за:
// 1) чтение категорий Woo
// 2) чтение товаров Woo
// 3) нормализацию raw Woo product в формат,
//    удобный для каталога и карточки товара Next
// -----------------------------------------------------

const ROOT_CATEGORY_BY_TYPE: Record<CatalogType, string> = {
    doors: "mezhkomnatnye-dveri",
    panels: "stenovye-paneli",
};

// -----------------------------------------------------
// Фиксированное сопоставление frontend URL -> Woo slug.
// Важно:
// - фронт работает с короткими URL /skrytye и /protivopozharnye
// - Woo категории у тебя заведены как skrytye-dveri и protivopozharnye-dveri
// -----------------------------------------------------

const DOOR_ROUTE_CATEGORY_TO_WOO_CATEGORY_SLUG: Record<
    DoorRouteCategory,
    string
> = {
    skrytye: "skrytye-dveri",
    protivopozharnye: "protivopozharnye-dveri",
};

const WOO_CATEGORY_SLUG_TO_DOOR_ROUTE_CATEGORY: Record<string, DoorRouteCategory> = {
    "skrytye-dveri": "skrytye",
    "protivopozharnye-dveri": "protivopozharnye",
};

// -----------------------------------------------------
// Работа с meta_data
// -----------------------------------------------------

function getMetaValue(
    metaData: WooMetaDataItem[] | undefined,
    key: string,
): unknown {
    if (!metaData || metaData.length === 0) {
        return null;
    }
    
    const item = metaData.find((entry) => entry.key === key);
    return item?.value ?? null;
}

function getMetaString(
    metaData: WooMetaDataItem[] | undefined,
    key: string,
): string | null {
    const value = getMetaValue(metaData, key);
    
    if (typeof value === "string" && value.trim() !== "") {
        return value;
    }
    
    if (typeof value === "number") {
        return String(value);
    }
    
    return null;
}

// -----------------------------------------------------
// Работа с атрибутами Woo
// -----------------------------------------------------

function cleanOptions(values: string[] | undefined): string[] | undefined {
    if (!values || values.length === 0) {
        return undefined;
    }
    
    const cleaned = values
        .map((item) => item.trim())
        .filter(Boolean);
    
    return cleaned.length > 0 ? cleaned : undefined;
}

// Универсальный поиск атрибута по нескольким возможным slug.
// Это важно, потому что глобальный атрибут Woo обычно приходит как pa_*,
// но лучше сделать код устойчивым и к "голому" slug.
function getAttributeOptionsBySlugs(
    product: WooProduct,
    possibleSlugs: string[],
): string[] | undefined {
    const attribute = product.attributes.find((item) =>
        possibleSlugs.includes(item.slug),
    );
    
    if (!attribute) {
        return undefined;
    }
    
    return cleanOptions(attribute.options);
}

function getDoorColor(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_tsvet-dveri", "tsvet-dveri"]);
}

function getDoorSize(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, ["pa_razmer-dveri", "razmer-dveri"]);
}

function getLeafCount(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, [
        "pa_kolichestvo-poloten",
        "kolichestvo-poloten",
    ]);
}

function getOpeningDirection(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, [
        "pa_napravlenie-otkryvaniya",
        "napravlenie-otkryvaniya",
    ]);
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
    return getAttributeOptionsBySlugs(product, [
        "pa_tip-otkryvaniya",
        "tip-otkryvaniya",
    ]);
}

function getGlazingType(product: WooProduct): string[] | undefined {
    return getAttributeOptionsBySlugs(product, [
        "pa_tip-ostekleniya",
        "tip-ostekleniya",
    ]);
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

// -----------------------------------------------------
// Картинка, описания и UI артикул
// -----------------------------------------------------

function normalizeMediaUrl(url: string | undefined): string | null {
    if (!url) {
        return null;
    }
    
    try {
        // Кодируем кириллицу, пробелы и прочие символы,
        // которые ломают header/preload на сервере.
        return encodeURI(url);
    } catch {
        // Если вдруг URL кривой, лучше вернуть исходное значение,
        // чем уронить весь рендер.
        return url;
    }
}

function getCardImage(product: WooProduct): string | null {
    const firstImage = product.images[0];
    return normalizeMediaUrl(firstImage?.src);
}

function getPublicArticleNo(product: WooProduct): string | null {
    if (
        typeof product.public_article_no === "string" &&
        product.public_article_no.trim() !== ""
    ) {
        return product.public_article_no;
    }
    
    return getMetaString(product.meta_data, "public_article_no");
}

function getHtmlOrNull(value: string | undefined): string | null {
    if (!value || value.trim() === "") {
        return null;
    }
    
    return value;
}

// -----------------------------------------------------
// Категории дверей и URL товара
// -----------------------------------------------------

function getDoorRouteCategoryFromWooCategorySlugs(
    categorySlugs: string[],
): DoorRouteCategory | null {
    for (const slug of categorySlugs) {
        const routeCategory = WOO_CATEGORY_SLUG_TO_DOOR_ROUTE_CATEGORY[slug];
        
        if (routeCategory) {
            return routeCategory;
        }
    }
    
    return null;
}

export function getDoorCategoryLabelByRouteCategory(
    routeCategory?: DoorRouteCategory,
): string {
    if (routeCategory === "skrytye") {
        return "Скрытые двери";
    }
    
    if (routeCategory === "protivopozharnye") {
        return "Противопожарные двери";
    }
    
    return "Межкомнатные двери";
}

export function getDoorTypeLabel(categorySlugs: string[]): string {
    const routeCategory = getDoorRouteCategoryFromWooCategorySlugs(categorySlugs);
    
    if (routeCategory === "skrytye") {
        return "Скрытая";
    }
    
    if (routeCategory === "protivopozharnye") {
        return "Противопожарная";
    }
    
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
        path: buildDoorProductPath({
            slug: product.slug,
            categorySlugs,
        }),
    };
}

function mapDoorProductDetails(product: WooProduct): DoorProductDetails {
    const categorySlugs = product.categories.map((category) => category.slug);
    
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
        path: buildDoorProductPath({
            slug: product.slug,
            categorySlugs,
        }),
        image: getCardImage(product),
        gallery: product.images,
        categories: product.categories,
        categorySlugs,
        shortDescriptionHtml: getHtmlOrNull(product.short_description),
        descriptionHtml: getHtmlOrNull(product.description),
        attributes: mapDoorAttributes(product),
    };
}

// -----------------------------------------------------
// Категории Woo
// -----------------------------------------------------

async function getAllProductCategories(): Promise<WooProductCategoryTerm[]> {
    const response = await wooGetList<WooProductCategoryTerm>(
        "products/categories",
        {
            per_page: 100,
            page: 1,
            hide_empty: false,
        },
        300,
    );
    
    return response.items;
}

function findCategoryBySlug(
    categories: WooProductCategoryTerm[],
    slug: string,
): WooProductCategoryTerm | undefined {
    return categories.find((category) => category.slug === slug);
}

function collectDescendantCategoryIds(
    categories: WooProductCategoryTerm[],
    rootId: number,
): number[] {
    const result = new Set<number>([rootId]);
    const queue: number[] = [rootId];
    
    while (queue.length > 0) {
        const currentParentId = queue.shift() as number;
        
        const children = categories.filter(
            (category) => category.parent === currentParentId,
        );
        
        for (const child of children) {
            if (result.has(child.id)) {
                continue;
            }
            
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
    const allowedIds = new Set(
        collectDescendantCategoryIds(categories, rootCategory.id),
    );
    
    if (!allowedIds.has(requestedCategory.id)) {
        throw new Error(
            `Категория "${requestedCategory.slug}" не принадлежит дереву "${rootCategory.slug}"`,
        );
    }
}

// -----------------------------------------------------
// Публичная функция каталога
// -----------------------------------------------------

type GetCatalogProductsArgs = {
    type: CatalogType;
    page?: number;
    perPage?: number;
    categorySlug?: string;
};

export async function getCatalogProducts(
    args: GetCatalogProductsArgs,
): Promise<CatalogResult> {
    const { type, page = 1, perPage = 24, categorySlug } = args;
    
    const rootCategorySlug = ROOT_CATEGORY_BY_TYPE[type];
    const categories = await getAllProductCategories();
    
    const rootCategory = findCategoryBySlug(categories, rootCategorySlug);
    
    if (!rootCategory) {
        throw new Error(
            `В WooCommerce не найдена категория со slug "${rootCategorySlug}"`,
        );
    }
    
    let effectiveCategory = rootCategory;
    
    if (categorySlug) {
        const requestedCategory = findCategoryBySlug(categories, categorySlug);
        
        if (!requestedCategory) {
            throw new Error(
                `В WooCommerce не найдена категория со slug "${categorySlug}"`,
            );
        }
        
        assertCategoryInsideTree(categories, rootCategory, requestedCategory);
        effectiveCategory = requestedCategory;
    }
    
    const categoryIds = collectDescendantCategoryIds(categories, effectiveCategory.id);
    
    const productsResponse = await wooGetList<WooProduct>(
        "products",
        {
            status: "publish",
            page,
            per_page: perPage,
            category: categoryIds.join(","),
            orderby: "date",
            order: "desc",
        },
        60,
    );
    
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

// -----------------------------------------------------
// Разбор универсального door route.
// -----------------------------------------------------

export type DoorRouteResolution =
    | {
    kind: "category";
    routeCategory: DoorRouteCategory;
    wooCategorySlug: string;
}
    | {
    kind: "product";
    slug: string;
    routeCategory?: DoorRouteCategory;
    wooCategorySlug?: string;
};

function isDoorRouteCategory(value: string): value is DoorRouteCategory {
    return value === "skrytye" || value === "protivopozharnye";
}

export function resolveDoorRoute(
    segments: string[],
): DoorRouteResolution | null {
    if (segments.length === 0 || segments.length > 2) {
        return null;
    }
    
    if (segments.length === 1) {
        const [firstSegment] = segments;
        
        if (isDoorRouteCategory(firstSegment)) {
            return {
                kind: "category",
                routeCategory: firstSegment,
                wooCategorySlug:
                    DOOR_ROUTE_CATEGORY_TO_WOO_CATEGORY_SLUG[firstSegment],
            };
        }
        
        return {
            kind: "product",
            slug: firstSegment,
        };
    }
    
    const [firstSegment, secondSegment] = segments;
    
    if (!isDoorRouteCategory(firstSegment)) {
        return null;
    }
    
    return {
        kind: "product",
        slug: secondSegment,
        routeCategory: firstSegment,
        wooCategorySlug: DOOR_ROUTE_CATEGORY_TO_WOO_CATEGORY_SLUG[firstSegment],
    };
}

// -----------------------------------------------------
// Чтение одной карточки двери по slug.
// -----------------------------------------------------

type GetDoorProductBySlugArgs = {
    slug: string;
    routeCategory?: DoorRouteCategory;
};

export async function getDoorProductBySlug(
    args: GetDoorProductBySlugArgs,
): Promise<DoorProductDetails | null> {
    const { slug, routeCategory } = args;
    
    const categories = await getAllProductCategories();
    const rootCategory = findCategoryBySlug(
        categories,
        ROOT_CATEGORY_BY_TYPE.doors,
    );
    
    if (!rootCategory) {
        throw new Error(
            `В WooCommerce не найдена категория со slug "${ROOT_CATEGORY_BY_TYPE.doors}"`,
        );
    }
    
    const allowedDoorCategoryIds = new Set(
        collectDescendantCategoryIds(categories, rootCategory.id),
    );
    
    const productsResponse = await wooGetList<WooProduct>(
        "products",
        {
            status: "publish",
            slug,
            per_page: 20,
            page: 1,
        },
        60,
    );
    
    const rawProduct = productsResponse.items.find((product) => {
        const belongsToDoorsTree = product.categories.some((category) =>
            allowedDoorCategoryIds.has(category.id),
        );
        
        if (!belongsToDoorsTree) {
            return false;
        }
        
        if (!routeCategory) {
            return true;
        }
        
        const expectedWooCategorySlug =
            DOOR_ROUTE_CATEGORY_TO_WOO_CATEGORY_SLUG[routeCategory];
        
        return product.categories.some(
            (category) => category.slug === expectedWooCategorySlug,
        );
    });
    
    if (!rawProduct) {
        return null;
    }
    
    return mapDoorProductDetails(rawProduct);
}
