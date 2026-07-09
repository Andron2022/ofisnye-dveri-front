// src/lib/wall-panels/types.ts

export type WallPanelImage = {
    id: number;
    src: string;
    alt: string;
    name?: string;
    thumbnail?: string;
};

export type WallPanelAttribute = {
    id: number;
    name: string;
    slug: string;
    options: string[];
};

export type WallPanelProduct = {
    id: number;
    slug: string;
    path: string;
    name: string;
    sku: string;
    publicArticleNo: string | null;
    image: string | null;
    images: WallPanelImage[];
    shortDescriptionHtml: string | null;
    shortDescriptionText: string;
    descriptionHtml: string | null;
    attributes: WallPanelAttribute[];
    material: string[];
    color: string[];
};

export type WallPanelsProcessStep = {
    title: string;
    description: string;
};

export type WallPanelsPageContent = {
    path: string;
    metaTitle: string;
    metaDescription: string;
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    heroImage?: {
        src: string;
        alt?: string;
    };
    introEyebrow: string;
    introTitle: string;
    introText: string;
    processTitle: string;
    processSteps: WallPanelsProcessStep[];
    productIds: number[];
    productsEyebrow: string;
    productsTitle: string;
    productsDescription: string;
    requestButtonLabel: string;
    ctaTitle: string;
    ctaText: string;
};

export type WallPanelRequestPayload = {
    productId: number;
    areaSqm: number;
    name: string;
    phone: string;
    email: string;
    comment: string;
    termsAccepted: boolean;
};

export type WallPanelRequestSuccessResponse = {
    success: true;
    orderId: number;
    orderNumber: string;
    status: string;
};

export type WallPanelRequestErrorResponse = {
    success: false;
    message: string;
    errors?: Array<{
        field: keyof WallPanelRequestPayload | "root";
        message: string;
    }>;
};

export type WallPanelRequestResponse = WallPanelRequestSuccessResponse | WallPanelRequestErrorResponse;
