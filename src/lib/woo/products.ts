// src/lib/woo/products.ts

import { wooGetList } from "@src/lib/woo/client";
import type {
    CatalogProductCard,
    CatalogResult,
    CatalogType,
    WooMetaDataItem,
    WooProduct,
    WooProductCategoryTerm,
} from "@src/lib/woo/types";

// -----------------------------------------------------
// Этот файл отвечает за:
// 1) чтение категорий Woo
// 2) чтение товаров Woo
// 3) нормализацию raw Woo product в формат,
//    удобный для каталога Next
// -----------------------------------------------------

const ROOT_CATEGORY_BY_TYPE: Record<CatalogType, string> = {
    doors: "mezhkomnatnye-dveri",
    panels: "stenovye-paneli",
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

// Убираем пробелы и пустые значения.
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

// Короткие алиасы, чтобы ниже код был читаемым.
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

// -----------------------------------------------------
// Картинка и UI артикул
// -----------------------------------------------------

function getCardImage(product: WooProduct): string | null {
    const firstImage = product.images[0];
    return firstImage?.src ?? null;
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

// -----------------------------------------------------
// Нормализация товара Woo в карточку каталога
// -----------------------------------------------------

function mapCatalogProductCard(product: WooProduct): CatalogProductCard {
    // TEMP DEBUG: смотрим сырые Woo attributes по нужным товарам
    const debugNeedles = ["dk01", "dk02", "dk03"];
    
    const debugHaystack = [
        product.name,
        product.slug,
        product.sku ?? "",
    ]
        .join(" ")
        .toLowerCase();
    
    const shouldDebug = debugNeedles.some((needle) =>
        debugHaystack.includes(needle),
    );
    
    if (shouldDebug) {
        console.log("\n================ RAW WOO PRODUCT DEBUG ================");
        console.log("name:", product.name);
        console.log("slug:", product.slug);
        console.log("sku:", product.sku ?? "—");
        console.log("public_article_no:", product.public_article_no ?? "—");
        console.log(
            "categories:",
            product.categories.map((c) => ({
                id: c.id,
                slug: c.slug,
                name: c.name,
            })),
        );
        console.dir(product.attributes, { depth: null });
        console.log("======================================================\n");
    }
    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        sku: product.sku ?? "",
        publicArticleNo: getPublicArticleNo(product),
        price: product.price ? product.price : null,
        image: getCardImage(product),
        categorySlugs: product.categories.map((category) => category.slug),
        attributes: {
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
        },
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

// -----------------------------------------------------
// Публичная функция каталога
// -----------------------------------------------------

type GetCatalogProductsArgs = {
    type: CatalogType;
    page?: number;
    perPage?: number;
};

export async function getCatalogProducts(
    args: GetCatalogProductsArgs,
): Promise<CatalogResult> {
    const { type, page = 1, perPage = 24 } = args;
    
    const rootCategorySlug = ROOT_CATEGORY_BY_TYPE[type];
    const categories = await getAllProductCategories();
    
    const rootCategory = findCategoryBySlug(categories, rootCategorySlug);
    
    if (!rootCategory) {
        throw new Error(
            `В WooCommerce не найдена категория со slug "${rootCategorySlug}"`,
        );
    }
    
    const categoryIds = collectDescendantCategoryIds(categories, rootCategory.id);
    
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
        categorySlug: rootCategorySlug,
        page,
        perPage,
        total: productsResponse.total,
        totalPages: productsResponse.totalPages,
        items: productsResponse.items.map(mapCatalogProductCard),
    };
}