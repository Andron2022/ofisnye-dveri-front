// src/lib/wp/content.ts

import type { Metadata } from "next";
import { buildSeoMetadata } from "@src/lib/seo/site";
import { normalizeHeadlessSeo } from "@src/lib/seo/types";
import type { HeadlessSeo } from "@src/lib/seo/types";
import {
    buildTrustPageMetadata,
    getTrustPageContent,
    trustPages,
} from "@src/lib/content/trust-pages";
import type {
    TrustPageContactInformation,
    TrustPageContactItem,
    TrustPageContent,
    TrustPageId,
    TrustPageSection,
} from "@src/lib/content/trust-pages";
import { getPrimaryRelatedProductsByIds } from "@src/lib/woo/products";
import type { CatalogProductCard } from "@src/lib/woo/types";
import { wpPublicGet, wpPublicGetList } from "@src/lib/wp/client";
import { getRenderedText, getRenderedValue, stripHtml, truncateText } from "@src/lib/wp/format";
import type {
    WpAcfImageObject,
    WpAcfImageValue,
    WpBaseContentItem,
    WpEmbeddedMedia,
    WpPageAcf,
    WpPageRestItem,
    WpPortfolioProjectAcf,
    WpPortfolioProjectRestItem,
    WpPostAcf,
    WpPostRestItem,
    WpTerm,
} from "@src/lib/wp/types";

const CONTENT_REVALIDATE_SECONDS = 300;
const DEFAULT_EXCERPT_LENGTH = 180;
const SERVICE_CARD_LIMIT = 6;

export type WpContentImage = {
    src: string;
    alt?: string;
};

export type WpPostFields = {
    quote?: string;
    subTextRelatedProducts?: string;
};

export type WpPortfolioFields = {
    cardLabel?: string;
    cardOrder?: number | null;
    isFeatured?: boolean;
    gridSize?: string;
    heroImage?: string;
    projectDate?: string;
    location?: string;
    client?: string;
    scope?: string;
    quote?: string;
    galleryImages: WpContentImage[];
};

export type WpContentPreview = {
    id: number;
    contentType: "post" | "portfolio_project";
    slug: string;
    path: string;
    title: string;
    excerpt: string;
    date?: string;
    modified?: string;
    featuredImage?: string;
    featuredImageAlt?: string;
    label?: string;
    sortOrder?: number | null;
    seo: HeadlessSeo;
    terms: Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
    }>;
};

export type WpContentNavigation = {
    previous?: WpContentPreview;
    next?: WpContentPreview;
    archivePath: string;
    archiveLabel: string;
};

export type WpContentDetails = WpContentPreview & {
    contentHtml: string;
    contentHtmlWithoutImages: string;
    contentImages: WpContentImage[];
    metaTitle: string;
    metaDescription: string;
    relatedProducts: CatalogProductCard[];
    relatedPosts: WpContentPreview[];
    relatedProjects: WpContentPreview[];
    navigation?: WpContentNavigation;
    post?: WpPostFields;
    portfolio?: WpPortfolioFields;
};

export type WpSitemapEntry = {
    path: string;
    modified?: string;
};

function getFeaturedMedia(item: WpBaseContentItem) {
    return item._embedded?.["wp:featuredmedia"]?.[0];
}

function getFeaturedImage(item: WpBaseContentItem): string | undefined {
    return getFeaturedMedia(item)?.source_url;
}

function getFeaturedImageAlt(item: WpBaseContentItem): string | undefined {
    const media = getFeaturedMedia(item);
    return media?.alt_text || getRenderedText(media?.title);
}

function getEmbeddedTerms(item: WpBaseContentItem): WpTerm[] {
    return item._embedded?.["wp:term"]?.flat() ?? [];
}

function getExcerpt(item: WpBaseContentItem): string {
    const explicitExcerpt = getRenderedText(item.excerpt);
    if (explicitExcerpt) return truncateText(explicitExcerpt, DEFAULT_EXCERPT_LENGTH);

    const contentText = getRenderedText(item.content);
    if (contentText) return truncateText(contentText, DEFAULT_EXCERPT_LENGTH);

    return "";
}

function getTitle(item: WpBaseContentItem): string {
    return getRenderedText(item.title) || item.slug;
}

function decodeHtmlAttribute(value: string): string {
    return value
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}

function getHtmlAttribute(tag: string, attribute: string): string | undefined {
    const pattern = new RegExp(`${attribute}=["']([^"']+)["']`, "i");
    const match = tag.match(pattern);
    return match?.[1] ? decodeHtmlAttribute(match[1]) : undefined;
}

function extractContentImages(html: string): WpContentImage[] {
    const result: WpContentImage[] = [];
    const seen = new Set<string>();
    const imageTagPattern = /<img\b[^>]*>/gi;
    let match: RegExpExecArray | null;

    while ((match = imageTagPattern.exec(html)) !== null) {
        const tag = match[0];
        const src = getHtmlAttribute(tag, "src");
        if (!src || seen.has(src)) continue;

        seen.add(src);
        result.push({
            src,
            alt: getHtmlAttribute(tag, "alt"),
        });
    }

    return result;
}

function stripImageBlocksFromHtml(html: string): string {
    return html
        .replace(/<figure\b[^>]*>[\s\S]*?<img\b[\s\S]*?<\/figure>/gi, "")
        .replace(/<p\b[^>]*>\s*<img\b[\s\S]*?<\/p>/gi, "")
        .replace(/<img\b[^>]*>/gi, "")
        .replace(/<p>\s*<\/p>/gi, "")
        .trim();
}

function normalizeContentPreview(item: WpBaseContentItem, pathPrefix: string): WpContentPreview {
    return {
        id: item.id,
        contentType: item.type === "portfolio_project" ? "portfolio_project" : "post",
        slug: item.slug,
        path: `${pathPrefix}/${item.slug}`,
        title: getTitle(item),
        excerpt: getExcerpt(item),
        date: item.date,
        modified: item.modified,
        featuredImage: getFeaturedImage(item),
        featuredImageAlt: getFeaturedImageAlt(item),
        seo: normalizeHeadlessSeo(item.headless_seo),
        terms: getEmbeddedTerms(item).map((term) => ({
            id: term.id,
            name: term.name,
            slug: term.slug,
            taxonomy: term.taxonomy,
        })),
    };
}

function normalizeContentDetails(item: WpBaseContentItem, pathPrefix: string): WpContentDetails {
    const preview = normalizeContentPreview(item, pathPrefix);
    const contentHtml = getRenderedValue(item.content);
    const fallbackDescription = preview.excerpt || `Материал «${preview.title}» на сайте Офисные двери.`;

    return {
        ...preview,
        contentHtml,
        contentHtmlWithoutImages: stripImageBlocksFromHtml(contentHtml),
        contentImages: extractContentImages(contentHtml),
        metaTitle: preview.seo.title || preview.title,
        metaDescription: preview.seo.description || truncateText(fallbackDescription, 220),
        relatedProducts: [],
        relatedPosts: [],
        relatedProjects: [],
    };
}

function getTrustPageSlug(id: TrustPageId): string {
    const fallback = getTrustPageContent(id);
    return fallback.path.split("/").filter(Boolean).at(-1) ?? fallback.path.replace(/^\//, "");
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getPageAcf(wpPage: WpPageRestItem): WpPageAcf {
    return isPlainObject(wpPage.acf) ? wpPage.acf as WpPageAcf : {};
}

function getPostAcf(wpPost: WpPostRestItem): WpPostAcf {
    return isPlainObject(wpPost.acf) ? wpPost.acf as WpPostAcf : {};
}

function getPortfolioProjectAcf(wpProject: WpPortfolioProjectRestItem): WpPortfolioProjectAcf {
    return isPlainObject(wpProject.acf) ? wpProject.acf as WpPortfolioProjectAcf : {};
}

function parseRelationIds(value: unknown): number[] {
    const values = Array.isArray(value) ? value : [value];
    const result = new Set<number>();

    for (const item of values) {
        if (typeof item === "number" && Number.isInteger(item) && item > 0) {
            result.add(item);
            continue;
        }

        if (typeof item !== "string") continue;

        item
            .split(/[\s,;]+/)
            .map((part) => Number(part.trim()))
            .filter((id) => Number.isInteger(id) && id > 0)
            .forEach((id) => result.add(id));
    }

    return Array.from(result);
}

async function getRelatedProductsByIds(ids: number[]): Promise<CatalogProductCard[]> {
    if (ids.length === 0) return [];

    try {
        return await getPrimaryRelatedProductsByIds(ids);
    } catch (error) {
        console.error("Failed to load related primary products", error);
        return [];
    }
}

function asString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
        const normalized = value.trim().replace(",", ".");
        if (normalized && Number.isFinite(Number(normalized))) return Number(normalized);
    }
    return null;
}

function asBoolean(value: unknown): boolean {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value === 1;
    if (typeof value === "string") return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
    return false;
}

function splitTextareaItems(value: unknown): string[] {
    return asString(value)
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function buildSectionFromAcfCard(acf: WpPageAcf, index: number): TrustPageSection | null {
    const title = asString(acf[`service_card_${index}_title`]);
    const description = asString(acf[`service_card_${index}_description`]);
    const items = splitTextareaItems(acf[`service_card_${index}_items`]);

    if (!title && !description && items.length === 0) return null;

    return {
        id: `service-card-${index}`,
        title: title || `Блок ${index}`,
        description: description || undefined,
        items,
    };
}

function getServiceCardsFromAcf(acf: WpPageAcf): TrustPageSection[] {
    return Array.from({ length: SERVICE_CARD_LIMIT }, (_, index) => buildSectionFromAcfCard(acf, index + 1))
        .filter((section): section is TrustPageSection => Boolean(section));
}

function normalizePhoneHref(value: string): string {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";

    if (digits.length === 11 && digits.startsWith("8")) {
        return `tel:+7${digits.slice(1)}`;
    }

    return digits.startsWith("+") ? `tel:${digits}` : `tel:+${digits}`;
}

function buildContactItemHref(label: string, value: string): string | undefined {
    const normalizedLabel = label.toLowerCase();

    if (normalizedLabel.includes("тел")) {
        return normalizePhoneHref(value);
    }

    if (normalizedLabel.includes("mail") || normalizedLabel.includes("e-mail") || normalizedLabel.includes("email")) {
        return value.includes("@") ? `mailto:${value.trim()}` : undefined;
    }

    return undefined;
}

function getContactInformationFromAcf(acf: WpPageAcf, fallback: TrustPageContent): TrustPageContactInformation | undefined {
    const lines = splitTextareaItems(acf.contacts_card_information);
    if (!lines.length) return fallback.contactInformation;

    const items: TrustPageContactItem[] = lines.map((line, index) => {
        const colonIndex = line.indexOf(":");

        if (colonIndex > 0) {
            const label = line.slice(0, colonIndex).trim();
            const value = line.slice(colonIndex + 1).trim();

            return {
                label,
                value,
                href: buildContactItemHref(label, value),
            };
        }

        const label = index === 0 ? "Компания" : "Информация";

        return {
            label,
            value: line,
        };
    });

    return {
        title: fallback.contactInformation?.title ?? "Контакты",
        items,
    };
}

function getContactSectionsFromAcf(acf: WpPageAcf, fallback: TrustPageContent): TrustPageSection[] {
    const section1Title = asString(acf.contacts_section_1_title);
    const section1Items = splitTextareaItems(acf.contacts_section_1_items);
    const section2Title = asString(acf.contacts_section_2_title);
    const section2Items = splitTextareaItems(acf.contacts_section_2_items);

    const sections = [
        section1Title || section1Items.length
            ? {
                id: "contacts-section-1",
                title: section1Title || fallback.sections[0]?.title || "Что подготовить перед обращением",
                items: section1Items.length ? section1Items : fallback.sections[0]?.items ?? [],
            }
            : null,
        section2Title || section2Items.length
            ? {
                id: "contacts-section-2",
                title: section2Title || fallback.sections[1]?.title || "С чем поможет менеджер",
                items: section2Items.length ? section2Items : fallback.sections[1]?.items ?? [],
            }
            : null,
    ].filter((section): section is TrustPageSection => Boolean(section));

    return sections.length ? sections : fallback.sections;
}

function getImageUrlFromObject(image: WpAcfImageObject): string | undefined {
    const preferredSizes = ["large", "medium_large", "full"];

    for (const size of preferredSizes) {
        const value = image.sizes?.[size];
        if (typeof value === "string" && value.trim()) return value.trim();
    }

    return image.url || image.source_url;
}

async function getWpMediaById(id: number): Promise<WpEmbeddedMedia | null> {
    try {
        return await wpPublicGet<WpEmbeddedMedia>(`media/${id}`, {}, CONTENT_REVALIDATE_SECONDS);
    } catch (error) {
        console.error(`Failed to load WP media: ${id}`, error);
        return null;
    }
}

function getImageAltFromObject(image: WpAcfImageObject): string | undefined {
    const title = image.title;
    if (typeof image.alt === "string" && image.alt.trim()) return image.alt.trim();
    if (typeof image.alt_text === "string" && image.alt_text.trim()) return image.alt_text.trim();
    if (typeof title === "string" && title.trim()) return title.trim();
    return isPlainObject(title) ? getRenderedText(title as { rendered?: string }) : undefined;
}

function getImageAltFromMedia(media: WpEmbeddedMedia | null): string | undefined {
    return media?.alt_text || getRenderedText(media?.title);
}

async function resolveAcfImage(value: WpAcfImageValue): Promise<WpContentImage | undefined> {
    if (!value) return undefined;

    if (typeof value === "string") {
        const trimmed = value.trim();
        if (/^https?:\/\//i.test(trimmed)) return { src: trimmed };

        const maybeId = asNumber(trimmed);
        if (!maybeId) return undefined;

        const media = await getWpMediaById(maybeId);
        return media?.source_url ? { src: media.source_url, alt: getImageAltFromMedia(media) } : undefined;
    }

    if (typeof value === "number") {
        const media = await getWpMediaById(value);
        return media?.source_url ? { src: media.source_url, alt: getImageAltFromMedia(media) } : undefined;
    }

    if (isPlainObject(value)) {
        const imageObject = value as WpAcfImageObject;
        const objectUrl = getImageUrlFromObject(imageObject);
        if (objectUrl) return { src: objectUrl, alt: getImageAltFromObject(imageObject) };

        const id = asNumber(imageObject.id ?? imageObject.ID);
        if (!id) return undefined;

        const media = await getWpMediaById(id);
        return media?.source_url ? { src: media.source_url, alt: getImageAltFromMedia(media) } : undefined;
    }

    return undefined;
}

async function resolveAcfImageUrl(value: WpAcfImageValue): Promise<string | undefined> {
    return (await resolveAcfImage(value))?.src;
}

async function resolveAcfGalleryImages(values: WpAcfImageValue[]): Promise<WpContentImage[]> {
    const images = await Promise.all(values.map((value) => resolveAcfImage(value)));
    const seen = new Set<string>();

    return images.filter((image): image is WpContentImage => {
        if (!image?.src || seen.has(image.src)) return false;
        seen.add(image.src);
        return true;
    });
}

async function mergeContactsPageWithAcf(fallback: TrustPageContent, wpPage: WpPageRestItem): Promise<TrustPageContent> {
    const acf = getPageAcf(wpPage);
    const title = getTitle(wpPage) || fallback.title;
    const description = asString(acf.contacts_description) || getExcerpt(wpPage) || fallback.description;
    const lead = asString(acf.contacts_lead) || fallback.lead;
    const heroImage = await resolveAcfImageUrl(acf.contacts_hero_image) ?? getFeaturedImage(wpPage) ?? fallback.heroImage;
    const navigatorHref = asString(acf.contacts_navigator_href) || asString(acf["link-route"]) || fallback.map?.navigatorHref;
    const navigatorLabel = asString(acf.contacts_navigator_label) || fallback.map?.navigatorLabel;
    const seo = normalizeHeadlessSeo(wpPage.headless_seo);

    return {
        ...fallback,
        title,
        description,
        lead,
        contentHtml: getRenderedValue(wpPage.content) || fallback.contentHtml,
        heroImage,
        seo,
        modified: wpPage.modified,
        metaTitle: seo.title || title,
        metaDescription: seo.description || truncateText(description || fallback.metaDescription, 220),
        contactInformation: getContactInformationFromAcf(acf, fallback),
        sections: getContactSectionsFromAcf(acf, fallback),
        map: fallback.map
            ? {
                ...fallback.map,
                title: asString(acf.contacts_map_title) || fallback.map.title,
                description: asString(acf.contacts_map_description) || fallback.map.description,
                embedUrl: asString(acf.contacts_map_embed_url) || fallback.map.embedUrl,
                navigatorHref,
                navigatorLabel,
            }
            : fallback.map,
    };
}

async function mergeWpPageWithTrustFallback(fallback: TrustPageContent, wpPage: WpPageRestItem): Promise<TrustPageContent> {
    if (fallback.id === "contacts") {
        return mergeContactsPageWithAcf(fallback, wpPage);
    }

    const acf = getPageAcf(wpPage);
    const title = getTitle(wpPage) || fallback.title;
    const excerpt = getExcerpt(wpPage);
    const contentText = getRenderedText(wpPage.content);
    const description = excerpt || fallback.description;
    const lead = asString(acf.lead_text) || fallback.lead;
    const contentHtml = getRenderedValue(wpPage.content);
    const heroImage = await resolveAcfImageUrl(acf.hero_background_image) ?? getFeaturedImage(wpPage) ?? fallback.heroImage;
    const serviceCards = getServiceCardsFromAcf(acf);
    const seo = normalizeHeadlessSeo(wpPage.headless_seo);

    return {
        ...fallback,
        title,
        description,
        lead,
        contentHtml: contentHtml || fallback.contentHtml,
        heroImage,
        seo,
        modified: wpPage.modified,
        sections: serviceCards.length ? serviceCards : fallback.sections,
        facts: undefined,
        steps: undefined,
        contactItems: undefined,
        primaryCta: undefined,
        secondaryCta: undefined,
        relatedLinks: undefined,
        metaTitle: seo.title || title,
        metaDescription: seo.description || truncateText(description || fallback.metaDescription, 220),
    };
}

export type WpArchiveSeoData = {
    path: string;
    modified?: string;
    seo: HeadlessSeo;
    image?: string;
    imageAlt?: string;
};

export async function getWpPageBySlug(slug: string): Promise<WpPageRestItem | null> {
    const { items } = await wpPublicGetList<WpPageRestItem>(
        "pages",
        {
            slug,
            status: "publish",
            _embed: "wp:featuredmedia",
        },
        CONTENT_REVALIDATE_SECONDS,
    );

    return items[0] ?? null;
}

export async function getWpArchiveSeoData(slug: string, path: string): Promise<WpArchiveSeoData> {
    try {
        const page = await getWpPageBySlug(slug);

        return {
            path,
            modified: page?.modified,
            seo: normalizeHeadlessSeo(page?.headless_seo),
            image: page ? getFeaturedImage(page) : undefined,
            imageAlt: page ? getFeaturedImageAlt(page) : undefined,
        };
    } catch (error) {
        console.error(`Failed to load WP archive SEO page: ${slug}`, error);
        return { path, seo: {} };
    }
}

export async function buildWpArchiveMetadata(args: {
    slug: string;
    path: string;
    title: string;
    description: string;
}): Promise<Metadata> {
    const data = await getWpArchiveSeoData(args.slug, args.path);

    return buildSeoMetadata({
        title: args.title,
        description: args.description,
        path: args.path,
        image: data.image,
        imageAlt: data.imageAlt,
        seo: data.seo,
    });
}

export async function getTrustPageContentWithWp(id: TrustPageId): Promise<TrustPageContent> {
    const fallback = getTrustPageContent(id);

    try {
        const page = await getWpPageBySlug(getTrustPageSlug(id));
        if (!page) return fallback;

        return mergeWpPageWithTrustFallback(fallback, page);
    } catch (error) {
        console.error(`Failed to load WP page for trust page: ${id}`, error);
        return fallback;
    }
}

export async function buildTrustPageMetadataWithWp(id: TrustPageId): Promise<Metadata> {
    try {
        const page = await getTrustPageContentWithWp(id);

        return buildSeoMetadata({
            title: page.metaTitle,
            description: page.metaDescription,
            path: page.path,
            image: page.heroImage,
            imageAlt: page.title,
            seo: page.seo,
        });
    } catch (error) {
        console.error(`Failed to build WP-driven trust page metadata: ${id}`, error);
        return buildTrustPageMetadata(id);
    }
}

export async function getWpPosts(limit = 20): Promise<WpContentPreview[]> {
    const { items } = await wpPublicGetList<WpPostRestItem>(
        "posts",
        {
            per_page: limit,
            status: "publish",
            orderby: "date",
            order: "desc",
            _embed: "wp:featuredmedia,wp:term",
        },
        CONTENT_REVALIDATE_SECONDS,
    );

    return items.map((item) => normalizeContentPreview(item, "/novosti-i-stati"));
}

export async function getWpPostsByIds(ids: number[], excludeId?: number): Promise<WpContentPreview[]> {
    const uniqueIds = Array.from(new Set(ids))
        .filter((id) => Number.isInteger(id) && id > 0 && id !== excludeId);

    if (uniqueIds.length === 0) return [];

    try {
        const { items } = await wpPublicGetList<WpPostRestItem>(
            "posts",
            {
                include: uniqueIds.join(","),
                per_page: Math.min(uniqueIds.length, 100),
                status: "publish",
                orderby: "include",
                _embed: "wp:featuredmedia,wp:term",
            },
            CONTENT_REVALIDATE_SECONDS,
        );

        const byId = new Map(items.map((item) => [item.id, item]));

        return uniqueIds
            .map((id) => byId.get(id))
            .filter((item): item is WpPostRestItem => Boolean(item))
            .map((item) => normalizeContentPreview(item, "/novosti-i-stati"));
    } catch (error) {
        console.error("Failed to load related WP posts", error);
        return [];
    }
}

async function getWpPostNavigation(currentId: number): Promise<WpContentNavigation> {
    const archivePath = "/novosti-i-stati";

    try {
        const items = await getWpPosts(100);
        const currentIndex = items.findIndex((item) => item.id === currentId);

        return {
            archivePath,
            archiveLabel: "Все новости и статьи",
            previous: currentIndex >= 0 ? items[currentIndex + 1] : undefined,
            next: currentIndex > 0 ? items[currentIndex - 1] : undefined,
        };
    } catch (error) {
        console.error("Failed to load WP post navigation", error);
        return { archivePath, archiveLabel: "Все новости и статьи" };
    }
}

type GetWpContentBySlugOptions = {
    includeRelated?: boolean;
};

export async function getWpPostBySlug(
    slug: string,
    options: GetWpContentBySlugOptions = {},
): Promise<WpContentDetails | null> {
    const { items } = await wpPublicGetList<WpPostRestItem>(
        "posts",
        {
            slug,
            status: "publish",
            _embed: "wp:featuredmedia,wp:term",
        },
        CONTENT_REVALIDATE_SECONDS,
    );

    const item = items[0];
    if (!item) return null;

    const details = normalizeContentDetails(item, "/novosti-i-stati");
    if (options.includeRelated === false) return details;

    const acf = getPostAcf(item);
    const [relatedProducts, relatedPosts, navigation] = await Promise.all([
        getRelatedProductsByIds(parseRelationIds(acf.post_related_product_ids)),
        getWpPostsByIds(parseRelationIds(acf.post_related_post_ids), item.id),
        getWpPostNavigation(item.id),
    ]);

    return {
        ...details,
        relatedProducts,
        relatedPosts,
        navigation,
        post: {
            quote: asString(acf.post_quote) || undefined,
            subTextRelatedProducts: asString(acf.post_sub_text_related_products) || undefined,
        },
    };
}

function getPortfolioGalleryAcfValues(acf: WpPortfolioProjectAcf): WpAcfImageValue[] {
    return [
        acf.portfolio_gallery_image_1,
        acf.portfolio_gallery_image_2,
        acf.portfolio_gallery_image_3,
        acf.portfolio_gallery_image_4,
        acf.portfolio_gallery_image_5,
        acf.portfolio_gallery_image_6,
    ];
}

function sortPortfolioPreviews(items: WpContentPreview[]): WpContentPreview[] {
    return [...items].sort((a, b) => {
        const hasOrderA = typeof a.sortOrder === "number";
        const hasOrderB = typeof b.sortOrder === "number";

        if (hasOrderA && hasOrderB && a.sortOrder !== b.sortOrder) {
            return (b.sortOrder ?? 0) - (a.sortOrder ?? 0);
        }

        if (hasOrderA !== hasOrderB) return hasOrderA ? -1 : 1;

        return new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();
    });
}

async function normalizePortfolioProjectPreview(item: WpPortfolioProjectRestItem): Promise<WpContentPreview> {
    const acf = getPortfolioProjectAcf(item);
    const preview = normalizeContentPreview(item, "/portfolio");
    const cardImage = await resolveAcfImage(acf.portfolio_card_image);
    const cardOrder = asNumber(acf.portfolio_card_order);

    return {
        ...preview,
        featuredImage: cardImage?.src ?? preview.featuredImage,
        featuredImageAlt: cardImage?.alt ?? preview.featuredImageAlt,
        label: asString(acf.portfolio_card_label) || preview.terms[0]?.name,
        sortOrder: cardOrder,
    };
}

async function normalizePortfolioProjectDetails(item: WpPortfolioProjectRestItem): Promise<WpContentDetails> {
    const acf = getPortfolioProjectAcf(item);
    const preview = await normalizePortfolioProjectPreview(item);
    const contentHtml = getRenderedValue(item.content);
    const fallbackDescription = preview.excerpt || `Проект «${preview.title}» на сайте Офисные двери.`;
    const heroImage = await resolveAcfImageUrl(acf.portfolio_hero_image);
    const galleryImages = await resolveAcfGalleryImages(getPortfolioGalleryAcfValues(acf));

    return {
        ...preview,
        contentHtml,
        contentHtmlWithoutImages: stripImageBlocksFromHtml(contentHtml),
        contentImages: extractContentImages(contentHtml),
        metaTitle: preview.seo.title || preview.title,
        metaDescription: preview.seo.description || truncateText(fallbackDescription, 220),
        relatedProducts: [],
        relatedPosts: [],
        relatedProjects: [],
        portfolio: {
            cardLabel: asString(acf.portfolio_card_label) || undefined,
            cardOrder: asNumber(acf.portfolio_card_order),
            isFeatured: asBoolean(acf.portfolio_is_featured),
            gridSize: asString(acf.portfolio_grid_size) || undefined,
            heroImage,
            projectDate: asString(acf.portfolio_project_date) || undefined,
            location: asString(acf.portfolio_location) || undefined,
            client: asString(acf.portfolio_client) || undefined,
            scope: asString(acf.portfolio_scope) || undefined,
            quote: asString(acf.portfolio_quote) || undefined,
            galleryImages,
        },
    };
}

export async function getWpPortfolioProjects(limit = 20): Promise<WpContentPreview[]> {
    const { items } = await wpPublicGetList<WpPortfolioProjectRestItem>(
        "portfolio_project",
        {
            per_page: limit,
            status: "publish",
            orderby: "date",
            order: "desc",
            _embed: "wp:featuredmedia,wp:term",
        },
        CONTENT_REVALIDATE_SECONDS,
    );

    return sortPortfolioPreviews(await Promise.all(items.map((item) => normalizePortfolioProjectPreview(item))));
}

async function getWpPortfolioProjectsByIds(ids: number[], excludeId?: number): Promise<WpContentPreview[]> {
    const uniqueIds = Array.from(new Set(ids))
        .filter((id) => Number.isInteger(id) && id > 0 && id !== excludeId);

    if (uniqueIds.length === 0) return [];

    try {
        const { items } = await wpPublicGetList<WpPortfolioProjectRestItem>(
            "portfolio_project",
            {
                include: uniqueIds.join(","),
                per_page: Math.min(uniqueIds.length, 100),
                status: "publish",
                orderby: "include",
                _embed: "wp:featuredmedia,wp:term",
            },
            CONTENT_REVALIDATE_SECONDS,
        );

        const byId = new Map(items.map((item) => [item.id, item]));

        const normalized = await Promise.all(
            uniqueIds
                .map((id) => byId.get(id))
                .filter((item): item is WpPortfolioProjectRestItem => Boolean(item))
                .map((item) => normalizePortfolioProjectPreview(item)),
        );

        return normalized;
    } catch (error) {
        console.error("Failed to load related portfolio projects", error);
        return [];
    }
}

async function getWpPortfolioProjectNavigation(currentId: number): Promise<WpContentNavigation> {
    const archivePath = "/portfolio";

    try {
        const items = await getWpPortfolioProjects(100);
        const currentIndex = items.findIndex((item) => item.id === currentId);

        return {
            archivePath,
            archiveLabel: "Все проекты",
            previous: currentIndex >= 0 ? items[currentIndex + 1] : undefined,
            next: currentIndex > 0 ? items[currentIndex - 1] : undefined,
        };
    } catch (error) {
        console.error("Failed to load WP portfolio project navigation", error);
        return { archivePath, archiveLabel: "Все проекты" };
    }
}

export async function getWpPortfolioProjectBySlug(
    slug: string,
    options: GetWpContentBySlugOptions = {},
): Promise<WpContentDetails | null> {
    const { items } = await wpPublicGetList<WpPortfolioProjectRestItem>(
        "portfolio_project",
        {
            slug,
            status: "publish",
            _embed: "wp:featuredmedia,wp:term",
        },
        CONTENT_REVALIDATE_SECONDS,
    );

    const item = items[0];
    if (!item) return null;

    const details = await normalizePortfolioProjectDetails(item);
    if (options.includeRelated === false) return details;

    const acf = getPortfolioProjectAcf(item);
    const [relatedProducts, relatedProjects, navigation] = await Promise.all([
        getRelatedProductsByIds(parseRelationIds(acf.portfolio_related_product_ids)),
        getWpPortfolioProjectsByIds(parseRelationIds(acf.portfolio_related_project_ids), item.id),
        getWpPortfolioProjectNavigation(item.id),
    ]);

    return {
        ...details,
        relatedProducts,
        relatedProjects,
        navigation,
    };
}

export function buildWpContentMetadata(item: WpContentDetails): Metadata {
    return buildSeoMetadata({
        title: item.metaTitle,
        description: item.metaDescription,
        path: item.path,
        image: item.portfolio?.heroImage || item.featuredImage,
        imageAlt: item.featuredImageAlt || item.title,
        seo: item.seo,
        openGraphType: "article",
        publishedTime: item.date,
        modifiedTime: item.modified,
    });
}

export async function getWpContentSitemapEntries(): Promise<WpSitemapEntry[]> {
    const entries: WpSitemapEntry[] = [];

    try {
        await Promise.all(
            Object.values(trustPages).map(async (fallbackPage) => {
                try {
                    const slug = fallbackPage.path.split("/").filter(Boolean).at(-1);
                    const wpPage = slug ? await getWpPageBySlug(slug) : null;
                    const seo = normalizeHeadlessSeo(wpPage?.headless_seo);

                    if (!seo.noindex) {
                        entries.push({ path: fallbackPage.path, modified: wpPage?.modified });
                    }
                } catch {
                    entries.push({ path: fallbackPage.path });
                }
            }),
        );
    } catch (error) {
        console.error("Failed to build WP page sitemap entries", error);
    }

    try {
        const archive = await getWpArchiveSeoData("novosti-i-stati", "/novosti-i-stati");
        if (!archive.seo.noindex) {
            entries.push({ path: archive.path, modified: archive.modified });
        }

        const posts = await getWpPosts(100);
        entries.push(...posts.filter((post) => !post.seo.noindex).map((post) => ({ path: post.path, modified: post.modified })));
    } catch (error) {
        console.error("Failed to build WP posts sitemap entries", error);
    }

    try {
        const archive = await getWpArchiveSeoData("portfolio", "/portfolio");
        if (!archive.seo.noindex) {
            entries.push({ path: archive.path, modified: archive.modified });
        }

        const projects = await getWpPortfolioProjects(100);
        entries.push(...projects.filter((project) => !project.seo.noindex).map((project) => ({ path: project.path, modified: project.modified })));
    } catch (error) {
        console.error("Failed to build WP portfolio sitemap entries", error);
    }

    return entries;
}

export function getPlainTextExcerpt(html: string, maxLength = 220): string {
    return truncateText(stripHtml(html), maxLength);
}
