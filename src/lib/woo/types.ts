import type { HeadlessSeo } from "@src/lib/seo/types";

// src/lib/woo/types.ts

export type WooMetaDataItem = {
    id?: number;
    key: string;
    value: unknown;
};

export type WooProductImage = {
    id: number;
    src: string;
    name?: string;
    alt?: string;
    thumbnail?: string;
};

export type WooProductCategory = {
    id: number;
    name: string;
    slug: string;
};

export type WooProductAttribute = {
    id: number;
    name: string;
    slug: string;
    position?: number;
    visible?: boolean;
    variation?: boolean;
    options: string[];
};

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
    status?: string;
    type?: string;
    purchasable?: boolean;
    description?: string;
    short_description?: string;
    images: WooProductImage[];
    categories: WooProductCategory[];
    attributes: WooProductAttribute[];
    meta_data: WooMetaDataItem[];
    public_article_no?: string;
    date_modified?: string;
    headless_seo?: HeadlessSeo;
};

export type WooProductCategoryTermImage = {
    id: number;
    src: string;
    name?: string;
    alt?: string;
};

export type WooProductCategoryTerm = {
    id: number;
    name: string;
    slug: string;
    parent: number;
    description?: string;
    image?: WooProductCategoryTermImage | null;
    menu_order?: number;
    count?: number;
    headless_seo?: HeadlessSeo;
};

export type WooListResponse<T> = {
    items: T[];
    total: number;
    totalPages: number;
};

export type CatalogType = "doors" | "panels";

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

export type DoorCatalogFilterKey =
    | "tsvet-dveri"
    | "razmer-dveri"
    | "kolichestvo-poloten"
    | "material-dveri"
    | "osteklenie"
    | "tip-otkryvaniya"
    | "naznachenie"
    | "napravlenie-otkryvaniya"
    | "ognestoykost"
    | "tip-ostekleniya";

export type CatalogActiveFilters = Partial<Record<DoorCatalogFilterKey, string[]>>;

export type CatalogFilterOption = {
    value: string;
    label: string;
    count: number;
    selected: boolean;
};

export type CatalogFilterGroup = {
    key: DoorCatalogFilterKey;
    label: string;
    options: CatalogFilterOption[];
};

export type CatalogFiltersState = {
    active: CatalogActiveFilters;
    groups: CatalogFilterGroup[];
};

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

export type DoorRouteCategory = string;

export type DoorCategoryInfo = {
    id: number;
    name: string;
    slug: string;
    routeSlug: string;
    path: string;
    description: string | null;
    image: string | null;
    count: number;
    seo: HeadlessSeo;
};

export type DoorCategoryNode = DoorCategoryInfo & {
    children: DoorCategoryNode[];
};

export type CatalogResult = {
    type: CatalogType;
    categorySlug: string;
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    items: CatalogProductCard[];
    filters: CatalogFiltersState;
    categoryTree?: DoorCategoryNode;
    currentCategory?: DoorCategoryInfo;
};

export type DoorSitemapProduct = {
    path: string;
    modified?: string;
    seo: HeadlessSeo;
};

export type DoorFeedProduct = {
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
    categories: WooProductCategory[];
    categorySlugs: string[];
    routeCategory: DoorCategoryInfo | null;
    shortDescriptionHtml: string | null;
    descriptionHtml: string | null;
    attributes: DoorCatalogAttributes;
};

export type DoorOptionChoice = {
    id: string;
    label: string;
    enabled: boolean;
    priceDelta: number;
    isDefault: boolean;
};

export type DoorOptionGroup = {
    key: "box" | "openingSide" | "soundproofing" | "threshold";
    title: string;
    defaultOptionId: string;
    choices: DoorOptionChoice[];
};

export type DoorOrderOptions = {
    box: DoorOptionGroup;
    openingSide: DoorOptionGroup;
    soundproofing: DoorOptionGroup;
    threshold: DoorOptionGroup;
};

export type DoorFamilySibling = {
    id: number;
    slug: string;
    name: string;
    sku: string;
    path: string;
    price: string | null;
    image: string | null;
    attributes: DoorCatalogAttributes;
    isCurrent: boolean;
};

export type DoorFamilyInfo = {
    code: string | null;
    siblings: DoorFamilySibling[];
};

export type DoorAccessoryCard = {
    id: number;
    slug: string;
    name: string;
    sku: string;
    publicArticleNo: string | null;
    price: string | null;
    image: string | null;
    categorySlugs: string[];
    shortLabel: string | null;
    recommendedQty: number;
    sortOrder: number;
    stockStatus: string | null;
};

export type DoorRelatedAccessories = {
    handles: DoorAccessoryCard[];
    hinges: DoorAccessoryCard[];
    locks: DoorAccessoryCard[];
};

export type DoorCartCandidate = {
    productId: number;
    name: string;
    sku: string;
    qty: number;
    basePrice: string | null;
    selectedOptions: {
        box: string;
        openingSide: string;
        soundproofing: string;
        threshold: string;
    };
    selectedAccessories: Array<{
        productId: number;
        qty: number;
    }>;
};

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
    routeCategory: DoorCategoryInfo | null;
    shortDescriptionHtml: string | null;
    descriptionHtml: string | null;
    attributes: DoorCatalogAttributes;
    family: DoorFamilyInfo;
    orderOptions: DoorOrderOptions;
    accessories: DoorRelatedAccessories;
    modified?: string;
    seo: HeadlessSeo;
};


export type WooOrderMetaDataItem = {
    key: string;
    value: string | number | boolean;
};

export type WooOrderLineItemPayload = {
    product_id: number;
    quantity: number;
    subtotal?: string;
    total?: string;
    meta_data?: WooOrderMetaDataItem[];
};

export type WooCreateOrderPayload = {
    status: "pending" | "processing" | "on-hold" | "completed" | "cancelled" | "refunded" | "failed";
    set_paid: boolean;
    payment_method: string;
    payment_method_title: string;
    billing: {
        first_name: string;
        last_name: string;
        company?: string;
        address_1: string;
        address_2?: string;
        city: string;
        state?: string;
        postcode?: string;
        country: string;
        email?: string;
        phone: string;
    };
    shipping: {
        first_name: string;
        last_name: string;
        company?: string;
        address_1: string;
        address_2?: string;
        city: string;
        state?: string;
        postcode?: string;
        country: string;
    };
    customer_note?: string;
    line_items: WooOrderLineItemPayload[];
    meta_data?: WooOrderMetaDataItem[];
};

export type WooCreatedOrder = {
    id: number;
    number: string;
    status: string;
    total: string;
    storefront_idempotency_replayed?: boolean;
};
