// src/lib/woo/types.ts

// -----------------------------------------------------
// Базовые типы ответа WooCommerce REST API.
// Здесь только те поля, которые нам реально нужны
// на первом живом шаге каталога.
// -----------------------------------------------------

// Любая meta_data запись WooCommerce.
export type WooMetaDataItem = {
    id?: number;
    key: string;
    value: unknown;
};

// Изображение товара WooCommerce.
export type WooProductImage = {
    id: number;
    src: string;
    name?: string;
    alt?: string;
};

// Категория товара WooCommerce внутри ответа продукта.
export type WooProductCategory = {
    id: number;
    name: string;
    slug: string;
};

// Атрибут товара WooCommerce внутри ответа продукта.
export type WooProductAttribute = {
    id: number;
    name: string;
    slug: string;
    position?: number;
    visible?: boolean;
    variation?: boolean;
    options: string[];
};

// Товар WooCommerce.
// Обрати внимание:
// - public_article_no оставляем как optional,
//   потому что он может прийти либо как custom REST field,
//   либо только внутри meta_data.
// - meta_data нужна нам, чтобы вытащить public_article_no уже сейчас.
export type WooProduct = {
    id: number;
    name: string;
    slug: string;
    permalink?: string;
    sku: string;
    price: string;
    regular_price?: string;
    sale_price?: string;
    stock_status?: string;
    images: WooProductImage[];
    categories: WooProductCategory[];
    attributes: WooProductAttribute[];
    meta_data: WooMetaDataItem[];
    public_article_no?: string;
};

// Отдельный термин product category из Woo REST.
export type WooProductCategoryTerm = {
    id: number;
    name: string;
    slug: string;
    parent: number;
    count?: number;
};

// Унифицированный ответ списка из Woo REST.
// total и totalPages берём из HTTP headers X-WP-Total и X-WP-TotalPages.
export type WooListResponse<T> = {
    items: T[];
    total: number;
    totalPages: number;
};

// Типы каталогов, которые мы будем читать.
// На этом шаге уже поддерживаем и двери, и панели,
// даже если страницу панелей пока не переключаем.
export type CatalogType = "doors" | "panels";

// Нормализованный товар карточки каталога для фронта.
// Это уже НЕ raw Woo response, а удобный формат для UI.
export type CatalogProductCard = {
    id: number;
    slug: string;
    name: string;
    sku: string;
    publicArticleNo: string | null;
    price: string | null;
    image: string | null;
    categorySlugs: string[];
    attributes: {
        color?: string[];
        size?: string[];
        leafCount?: string[];
        openingDirection?: string[];
        fireResistance?: string[];
        material?: string[];
        glazing?: string[];
        openingType?: string[];
        glazingType?: string[];
        purpose?: string[];
    };
};

// Итоговый ответ для каталога.
export type CatalogResult = {
    type: CatalogType;
    categorySlug: string;
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    items: CatalogProductCard[];
};