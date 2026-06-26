// src/lib/wp/content.ts

import type { Metadata } from "next";
import { buildSeoMetadata } from "@src/lib/seo/site";
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

export type WpContentPreview = {
    id: number;
    slug: string;
    path: string;
    title: string;
    excerpt: string;
    date?: string;
    modified?: string;
    featuredImage?: string;
    featuredImageAlt?: string;
    terms: Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
    }>;
};

export type WpContentDetails = WpContentPreview & {
    contentHtml: string;
    metaTitle: string;
    metaDescription: string;
    relatedProducts: CatalogProductCard[];
    relatedPosts: WpContentPreview[];
    relatedProjects: WpContentPreview[];
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

function normalizeContentPreview(item: WpBaseContentItem, pathPrefix: string): WpContentPreview {
    return {
        id: item.id,
        slug: item.slug,
        path: `${pathPrefix}/${item.slug}`,
        title: getTitle(item),
        excerpt: getExcerpt(item),
        date: item.date,
        modified: item.modified,
        featuredImage: getFeaturedImage(item),
        featuredImageAlt: getFeaturedImageAlt(item),
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
    const fallbackDescription = preview.excerpt || `Материал «${preview.title}» на сайте Офисные двери.`;

    return {
        ...preview,
        contentHtml: getRenderedValue(item.content),
        metaTitle: preview.title,
        metaDescription: truncateText(fallbackDescription, 220),
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
    if (typeof value === "string" && /^\d+$/.test(value.trim())) return Number(value.trim());
    return null;
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

async function resolveAcfImageUrl(value: WpAcfImageValue): Promise<string | undefined> {
    if (!value) return undefined;

    if (typeof value === "string") {
        const trimmed = value.trim();
        if (/^https?:\/\//i.test(trimmed)) return trimmed;

        const maybeId = asNumber(trimmed);
        if (!maybeId) return undefined;

        const media = await getWpMediaById(maybeId);
        return media?.source_url;
    }

    if (typeof value === "number") {
        const media = await getWpMediaById(value);
        return media?.source_url;
    }

    if (isPlainObject(value)) {
        const objectUrl = getImageUrlFromObject(value as WpAcfImageObject);
        if (objectUrl) return objectUrl;

        const id = asNumber((value as WpAcfImageObject).id ?? (value as WpAcfImageObject).ID);
        if (!id) return undefined;

        const media = await getWpMediaById(id);
        return media?.source_url;
    }

    return undefined;
}

async function mergeContactsPageWithAcf(fallback: TrustPageContent, wpPage: WpPageRestItem): Promise<TrustPageContent> {
    const acf = getPageAcf(wpPage);
    const title = getTitle(wpPage) || fallback.title;
    const description = asString(acf.contacts_description) || getExcerpt(wpPage) || fallback.description;
    const lead = asString(acf.contacts_lead) || fallback.lead;
    const heroImage = await resolveAcfImageUrl(acf.contacts_hero_image) ?? getFeaturedImage(wpPage) ?? fallback.heroImage;
    const navigatorHref = asString(acf.contacts_navigator_href) || asString(acf["link-route"]) || fallback.map?.navigatorHref;
    const navigatorLabel = asString(acf.contacts_navigator_label) || fallback.map?.navigatorLabel;

    return {
        ...fallback,
        title,
        description,
        lead,
        contentHtml: getRenderedValue(wpPage.content) || fallback.contentHtml,
        heroImage,
        metaTitle: title,
        metaDescription: truncateText(description || fallback.metaDescription, 220),
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

    return {
        ...fallback,
        title,
        description,
        lead,
        contentHtml: contentHtml || fallback.contentHtml,
        heroImage,
        sections: serviceCards.length ? serviceCards : fallback.sections,
        facts: undefined,
        steps: undefined,
        contactItems: undefined,
        primaryCta: undefined,
        secondaryCta: undefined,
        relatedLinks: undefined,
        metaTitle: title,
        metaDescription: truncateText(description || fallback.metaDescription, 220),
    };
}

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

async function getWpPostsByIds(ids: number[], excludeId?: number): Promise<WpContentPreview[]> {
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
    const [relatedProducts, relatedPosts] = await Promise.all([
        getRelatedProductsByIds(parseRelationIds(acf.post_related_product_ids)),
        getWpPostsByIds(parseRelationIds(acf.post_related_post_ids), item.id),
    ]);

    return {
        ...details,
        relatedProducts,
        relatedPosts,
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

    return items.map((item) => normalizeContentPreview(item, "/portfolio"));
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

        return uniqueIds
            .map((id) => byId.get(id))
            .filter((item): item is WpPortfolioProjectRestItem => Boolean(item))
            .map((item) => normalizeContentPreview(item, "/portfolio"));
    } catch (error) {
        console.error("Failed to load related portfolio projects", error);
        return [];
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

    const details = normalizeContentDetails(item, "/portfolio");
    if (options.includeRelated === false) return details;

    const acf = getPortfolioProjectAcf(item);
    const [relatedProducts, relatedProjects] = await Promise.all([
        getRelatedProductsByIds(parseRelationIds(acf.portfolio_related_product_ids)),
        getWpPortfolioProjectsByIds(parseRelationIds(acf.portfolio_related_project_ids), item.id),
    ]);

    return {
        ...details,
        relatedProducts,
        relatedProjects,
    };
}

export function buildWpContentMetadata(item: WpContentDetails): Metadata {
    return buildSeoMetadata({
        title: item.metaTitle,
        description: item.metaDescription,
        path: item.path,
        image: item.featuredImage,
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
                    entries.push({
                        path: fallbackPage.path,
                        modified: wpPage?.modified,
                    });
                } catch {
                    entries.push({ path: fallbackPage.path });
                }
            }),
        );
    } catch (error) {
        console.error("Failed to build WP page sitemap entries", error);
    }

    try {
        entries.push({ path: "/novosti-i-stati" });
        const posts = await getWpPosts(100);
        entries.push(...posts.map((post) => ({ path: post.path, modified: post.modified })));
    } catch (error) {
        console.error("Failed to build WP posts sitemap entries", error);
    }

    try {
        entries.push({ path: "/portfolio" });
        const projects = await getWpPortfolioProjects(100);
        entries.push(...projects.map((project) => ({ path: project.path, modified: project.modified })));
    } catch (error) {
        console.error("Failed to build WP portfolio sitemap entries", error);
    }

    return entries;
}

export function getPlainTextExcerpt(html: string, maxLength = 220): string {
    return truncateText(stripHtml(html), maxLength);
}
