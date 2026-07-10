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

export type WpAcfImageObject = {
    id?: number;
    ID?: number;
    url?: string;
    source_url?: string;
    alt?: string;
    alt_text?: string;
    title?: string | WpRenderedField;
    sizes?: Record<string, string | number | undefined>;
};

export type WpAcfImageValue = number | string | WpAcfImageObject | null | undefined;

export type WpPageAcf = Record<string, unknown> & {
    hero_background_image?: WpAcfImageValue;
    lead_text?: string;
    door_pdp_care_title?: string;
    door_pdp_care_content?: string;
    door_pdp_warranty_title?: string;
    door_pdp_warranty_content?: string;
    door_pdp_family_matrix_enabled?: boolean | string | number;
    contacts_hero_image?: WpAcfImageValue;
    contacts_description?: string;
    contacts_lead?: string;
    contacts_card_information?: string;
    contacts_section_1_title?: string;
    contacts_section_1_items?: string;
    contacts_section_2_title?: string;
    contacts_section_2_items?: string;
    contacts_map_title?: string;
    contacts_map_description?: string;
    contacts_map_embed_url?: string;
    contacts_navigator_href?: string;
    contacts_navigator_label?: string;
    "link-route"?: string;
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
    acf?: WpPageAcf | unknown[];
};

export type WpPostAcf = Record<string, unknown> & {
    post_quote?: string;
    post_sub_text_related_products?: string;
    post_related_product_ids?: string | number | number[];
    post_related_post_ids?: string | number | number[];
};

export type WpPortfolioProjectAcf = Record<string, unknown> & {
    portfolio_card_image?: WpAcfImageValue;
    portfolio_card_label?: string;
    portfolio_card_order?: string | number;
    portfolio_is_featured?: boolean | string | number;
    portfolio_grid_size?: string;
    portfolio_hero_image?: WpAcfImageValue;
    portfolio_project_date?: string;
    portfolio_location?: string;
    portfolio_client?: string;
    portfolio_scope?: string;
    portfolio_quote?: string;
    portfolio_gallery_image_1?: WpAcfImageValue;
    portfolio_gallery_image_2?: WpAcfImageValue;
    portfolio_gallery_image_3?: WpAcfImageValue;
    portfolio_gallery_image_4?: WpAcfImageValue;
    portfolio_gallery_image_5?: WpAcfImageValue;
    portfolio_gallery_image_6?: WpAcfImageValue;
    portfolio_related_product_ids?: string | number | number[];
    portfolio_related_project_ids?: string | number | number[];
};

export type WpPostRestItem = WpBaseContentItem & {
    type: "post";
    categories?: number[];
    tags?: number[];
    acf?: WpPostAcf | unknown[];
};

export type WpPortfolioProjectRestItem = WpBaseContentItem & {
    type: "portfolio_project";
    portfolio_project_category?: number[];
    portfolio_project_categories?: WpTerm[];
    acf?: WpPortfolioProjectAcf | unknown[];
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
