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
};

export type WooProductCategoryTerm = {
    id: number;
    name: string;
    slug: string;
    parent: number;
    count?: number;
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

export type CatalogResult = {
    type: CatalogType;
    categorySlug: string;
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    items: CatalogProductCard[];
};

export type DoorRouteCategory = "skrytye" | "protivopozharnye";

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
    shortDescriptionHtml: string | null;
    descriptionHtml: string | null;
    attributes: DoorCatalogAttributes;
    family: DoorFamilyInfo;
    orderOptions: DoorOrderOptions;
    accessories: DoorRelatedAccessories;
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
        email: string;
        phone: string;
    };
    shipping: {
        first_name: string;
        last_name: string;
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
};
