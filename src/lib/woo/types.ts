// src/lib/woo/types.ts

// -----------------------------------------------------
// Базовые типы ответа WooCommerce REST API.
// Здесь только те поля, которые реально нужны
// для текущего MVP: каталог, карточка товара и BFF.
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
// description и short_description нужны уже на шаге PDP.
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
    description?: string;
    short_description?: string;
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
export type CatalogType = "doors" | "panels";

// Унифицированная карта нужных атрибутов двери.
export type DoorCatalogAttributes = {
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

// Нормализованный товар карточки каталога для фронта.
export type CatalogProductCard = {
    id: number;
    slug: string;
    name: string;
    sku: string;
    publicArticleNo: string | null;
    price: string | null;
    image: string | null;
    categorySlugs: string[];
    attributes: DoorCatalogAttributes;
    path: string;
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

// Нормализованный товар для страницы карточки.
export type DoorProductDetails = {
    id: number;
    slug: string;
    name: string;
    sku: string;
    publicArticleNo: string | null;
    price: string | null;
    regularPrice: string | null;
    salePrice: string | null;
    stockStatus: string | null;
    path: string;
    image: string | null;
    gallery: WooProductImage[];
    categories: WooProductCategory[];
    categorySlugs: string[];
    shortDescriptionHtml: string | null;
    descriptionHtml: string | null;
    attributes: DoorCatalogAttributes;
};

// Категории маршрута дверей на фронте.
export type DoorRouteCategory = "skrytye" | "protivopozharnye";
