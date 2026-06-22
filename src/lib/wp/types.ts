// src/lib/wp/types.ts

export type WpRenderedField = {
    rendered?: string;
    protected?: boolean;
};

export type WpEmbeddedMedia = {
    id?: number;
    date?: string;
    slug?: string;
    type?: string;
    link?: string;
    title?: WpRenderedField;
    alt_text?: string;
    source_url?: string;
    media_details?: {
        width?: number;
        height?: number;
        sizes?: Record<string, { source_url?: string; width?: number; height?: number }>;
    };
};

export type WpTerm = {
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
};

export type WpEmbedded = {
    "wp:featuredmedia"?: WpEmbeddedMedia[];
    "wp:term"?: WpTerm[][];
};

export type WpBaseContentItem = {
    id: number;
    date?: string;
    modified?: string;
    slug: string;
    status: string;
    type: string;
    link?: string;
    title?: WpRenderedField;
    content?: WpRenderedField;
    excerpt?: WpRenderedField;
    featured_media?: number;
    parent?: number;
    menu_order?: number;
    _embedded?: WpEmbedded;
};

export type WpPageRestItem = WpBaseContentItem & {
    type: "page";
};

export type WpPostRestItem = WpBaseContentItem & {
    type: "post";
    categories?: number[];
    tags?: number[];
};

export type WpPortfolioProjectRestItem = WpBaseContentItem & {
    type: "portfolio_project";
    portfolio_project_category?: number[];
    portfolio_project_categories?: WpTerm[];
    acf?: Record<string, unknown> | unknown[];
};

export type WpNavigationRestItem = {
    id: number;
    slug: string;
    status: string;
    type: "wp_navigation";
    title?: WpRenderedField;
    content?: WpRenderedField;
    modified?: string;
};
