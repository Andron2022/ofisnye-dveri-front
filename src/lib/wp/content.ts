// src/lib/wp/content.ts

import type { Metadata } from "next";
import { buildSeoMetadata } from "@src/lib/seo/site";
import {
    buildTrustPageMetadata,
    getTrustPageContent,
    trustPages,
} from "@src/lib/content/trust-pages";
import type { TrustPageContent, TrustPageId } from "@src/lib/content/trust-pages";
import { wpPublicGetList } from "@src/lib/wp/client";
import { getRenderedText, getRenderedValue, stripHtml, truncateText } from "@src/lib/wp/format";
import type {
    WpBaseContentItem,
    WpPageRestItem,
    WpPortfolioProjectRestItem,
    WpPostRestItem,
    WpTerm,
} from "@src/lib/wp/types";

const CONTENT_REVALIDATE_SECONDS = 300;
const DEFAULT_EXCERPT_LENGTH = 180;

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
    };
}

function getTrustPageSlug(id: TrustPageId): string {
    const fallback = getTrustPageContent(id);
    return fallback.path.split("/").filter(Boolean).at(-1) ?? fallback.path.replace(/^\//, "");
}

function mergeWpPageWithTrustFallback(fallback: TrustPageContent, wpPage: WpPageRestItem): TrustPageContent {
    const title = getTitle(wpPage) || fallback.title;
    const excerpt = getExcerpt(wpPage);
    const contentText = getRenderedText(wpPage.content);
    const description = excerpt || fallback.description;
    const lead = excerpt || truncateText(contentText, 240) || fallback.lead;
    const contentHtml = getRenderedValue(wpPage.content);

    return {
        ...fallback,
        title,
        description,
        lead,
        contentHtml: contentHtml || fallback.contentHtml,
        heroImage: getFeaturedImage(wpPage) ?? fallback.heroImage,
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

export async function getWpPostBySlug(slug: string): Promise<WpContentDetails | null> {
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

    return item ? normalizeContentDetails(item, "/novosti-i-stati") : null;
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

export async function getWpPortfolioProjectBySlug(slug: string): Promise<WpContentDetails | null> {
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

    return item ? normalizeContentDetails(item, "/portfolio") : null;
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
