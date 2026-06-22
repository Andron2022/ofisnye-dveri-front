// src/lib/wp/menu.ts

import { siteNavigation } from "@src/lib/navigation/site-menu";
import type { SiteNavigationItem } from "@src/lib/navigation/site-menu";
import { getWordPressBaseUrl, wpPublicGetList } from "@src/lib/wp/client";
import { decodeHtmlEntities, stripHtml } from "@src/lib/wp/format";
import type { WpNavigationRestItem } from "@src/lib/wp/types";

// -----------------------------------------------------
// WP Navigation Editor / wp_navigation → SiteNavigationItem[].
// Источник выбирается через slug в .env.local:
// WP_HEADER_NAVIGATION_SLUG=navigation
// WP_FOOTER_NAVIGATION_SLUG=menyu-podval
// -----------------------------------------------------

export type WpDrivenNavigation = {
    headerNavigation: SiteNavigationItem[];
    footerNavigation: SiteNavigationItem[];
};

const NAVIGATION_REVALIDATE_SECONDS = 300;

function slugifyNavigationId(value: string): string {
    const normalized = value
        .toLowerCase()
        .replace(/ё/g, "e")
        .replace(/[^a-zа-я0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "");

    return normalized || "item";
}

function extractAttribute(tag: string, attributeName: string): string | undefined {
    const pattern = new RegExp(`${attributeName}\\s*=\\s*(["'])(.*?)\\1`, "i");
    const match = tag.match(pattern);
    return match?.[2] ? decodeHtmlEntities(match[2]) : undefined;
}

function extractTopLevelTagBlocks(html: string, tagName: "li" | "ul"): string[] {
    const blocks: string[] = [];
    const pattern = new RegExp(`<\\/?${tagName}\\b[^>]*>`, "gi");
    let depth = 0;
    let blockStart = -1;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(html)) !== null) {
        const tag = match[0];
        const isClosing = tag.startsWith("</");

        if (!isClosing) {
            if (depth === 0) {
                blockStart = match.index;
            }
            depth += 1;
            continue;
        }

        depth = Math.max(depth - 1, 0);

        if (depth === 0 && blockStart >= 0) {
            blocks.push(html.slice(blockStart, pattern.lastIndex));
            blockStart = -1;
        }
    }

    return blocks;
}

function extractFirstTopLevelUlInnerHtml(html: string): string | null {
    const blocks = extractTopLevelTagBlocks(html, "ul");
    const firstBlock = blocks[0];

    if (!firstBlock) return null;

    const openingTagEnd = firstBlock.indexOf(">");
    const closingTagStart = firstBlock.toLowerCase().lastIndexOf("</ul>");

    if (openingTagEnd < 0 || closingTagStart < 0) return null;

    return firstBlock.slice(openingTagEnd + 1, closingTagStart);
}

function getFirstLinkData(liHtml: string): { href?: string; label: string } | null {
    const firstNestedUlIndex = liHtml.search(/<ul\b/i);
    const ownHtml = firstNestedUlIndex >= 0 ? liHtml.slice(0, firstNestedUlIndex) : liHtml;
    const anchorMatch = ownHtml.match(/<a\b([^>]*)>([\s\S]*?)<\/a>/i);

    if (!anchorMatch) return null;

    const href = extractAttribute(anchorMatch[1], "href");
    const label = stripHtml(anchorMatch[2]);

    if (!label) return null;

    return {
        href,
        label,
    };
}

function normalizeNavigationHref(rawHref: string | undefined): string | undefined {
    if (!rawHref) return undefined;

    const trimmedHref = rawHref.trim();

    if (!trimmedHref || trimmedHref === "#") return undefined;

    if (trimmedHref.startsWith("/")) {
        return trimmedHref;
    }

    try {
        const url = new URL(trimmedHref);
        const wordpressBaseUrl = getWordPressBaseUrl();
        const wordpressOrigin = wordpressBaseUrl ? new URL(wordpressBaseUrl).origin : null;

        if (wordpressOrigin && url.origin === wordpressOrigin) {
            return `${url.pathname}${url.search}${url.hash}` || "/";
        }

        return trimmedHref;
    } catch {
        return trimmedHref;
    }
}

function parseNavigationListItems(html: string, idPrefix: string): SiteNavigationItem[] {
    return extractTopLevelTagBlocks(html, "li")
        .map((liHtml, index) => {
            const linkData = getFirstLinkData(liHtml);
            if (!linkData) return null;

            const itemId = `${idPrefix}-${slugifyNavigationId(linkData.label)}-${index}`;
            const childListHtml = extractFirstTopLevelUlInnerHtml(liHtml);
            const children = childListHtml ? parseNavigationListItems(childListHtml, itemId) : [];

            const item: SiteNavigationItem = {
                id: itemId,
                label: linkData.label,
            };

            const href = normalizeNavigationHref(linkData.href);
            if (href) {
                item.href = href;
            }

            if (children.length > 0) {
                item.children = children;
            }

            return item;
        })
        .filter((item): item is SiteNavigationItem => Boolean(item));
}

function normalizeNavigationItems(navigation: WpNavigationRestItem, fallback: SiteNavigationItem[]): SiteNavigationItem[] {
    const html = navigation.content?.rendered ?? "";
    const items = parseNavigationListItems(html, `wp-nav-${navigation.slug}`);

    return items.length > 0 ? items : fallback;
}

async function getNavigationItemsBySlug(slug: string | undefined, fallback: SiteNavigationItem[]): Promise<SiteNavigationItem[]> {
    if (!slug?.trim()) return fallback;

    try {
        const { items } = await wpPublicGetList<WpNavigationRestItem>(
            "navigation",
            {
                per_page: 100,
                status: "publish",
            },
            NAVIGATION_REVALIDATE_SECONDS,
        );

        const navigation = items.find((item) => item.slug === slug.trim());

        if (!navigation) return fallback;

        return normalizeNavigationItems(navigation, fallback);
    } catch (error) {
        console.error(`Failed to load WP navigation by slug: ${slug}`, error);
        return fallback;
    }
}

export async function getWpDrivenNavigation(): Promise<WpDrivenNavigation> {
    const headerMenuSlug = process.env.WP_HEADER_NAVIGATION_SLUG;
    const footerMenuSlug = process.env.WP_FOOTER_NAVIGATION_SLUG;

    const [headerNavigation, footerNavigation] = await Promise.all([
        getNavigationItemsBySlug(headerMenuSlug, siteNavigation),
        getNavigationItemsBySlug(footerMenuSlug, siteNavigation),
    ]);

    return {
        headerNavigation,
        footerNavigation,
    };
}
